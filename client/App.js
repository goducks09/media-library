import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home, { Add, Library, Search } from './src/navigators';
import AccountScreen from "./src/screens/account";
import { Image, Platform } from 'react-native';
import { StyledButtonText, StyledCenteredSafeArea, StyledLogin, StyledLoginView, ToastMessage } from './src/config/globalStylesStyled';
const add = require('./assets/plus-48.png');
const home = require('./assets/home-48.png');
const library = require('./assets/library-48.png');
const search = require('./assets/search-48.png');
import * as SecureStore from 'expo-secure-store';

export const platform = Platform.OS;
export const herokuServer = 'https://floating-dawn-94898.herokuapp.com';
export const localServer = 'http://localhost:3000';
const server = platform === 'web' ? localServer : herokuServer;

export const UserContext = React.createContext();
const Tab = createBottomTabNavigator();
// For web: Possibly completes an authentication session on web in a window popup
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    expoClientId: '421500213015-sffcon0liumjdu9qqskq99qc9jgblboh.apps.googleusercontent.com',
    webClientId: '421500213015-0ha9ogc3m9s547k1k6ptj6b7ddo2dcmm.apps.googleusercontent.com'
  });

  const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      getUserInfo(result);
    }
  };
  
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      googleLogin(authentication);
    } else if (response && response?.type !== 'success') {
      ToastMessage('Your account could not be authenticated. Please try again. If you are using 2-step verification, you may need to make sure your device is listed as trusted in your Google account.');
    }
  }, [response]);

  useEffect(() => {
    getValueFor('authenticatedUser');
  }, []);
  
  // User authenticates via Google and then use returned token to request user's Google profile
  const googleLogin = async (authentication) => {
    try {
      if (response?.type === 'success') {
        let apiResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authentication.accessToken}`
          },
        });

        if (!apiResponse.ok) {
          ToastMessage(`Sorry there was an error. Please try again. Error ${apiResponse.status}`);
          throw new Error(`Sorry there was an error. Please try again. Error ${apiResponse.status}`);
        }

        let json = await apiResponse.json();
        SecureStore.setItemAsync('authenticatedUser', json.email);
        addNew ? createAccount(json.email) : getUserInfo(json.email);
      }
    } catch (err) {
      ToastMessage(`Sorry there was an error. Please try again. Error ${err}`);
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const getUserInfo = async email => {
    try {
      setLoading(true);
      let response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: email
        })
      });
      let json = await response.json();
      setLoading(false);
      ToastMessage(json.message);
      if (json.userData) {
        setUserID(json.userData.userID);
        setUserItems(json.userData.userItems);
      }
    } catch (err) {
      setLoading(false);
      ToastMessage(`Sorry there was an error. Please try again. Error ${err}`);
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const createAccount = async email => {
    try {
      let response = await fetch(`${server}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: email
        })
      });
      let json = await response.json();
      ToastMessage(json.message);
      if (json.userID) {
        setUserID(json.userID);
      }
    } catch (err) {
      ToastMessage(`Sorry there was an error. Please try again. Error ${err}`);
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const handleCreatePress = () => {
    setAddNew(true);
    promptAsync();
  };

  const contextValue = {
    userID,
    userItems,
    updateItemList: (item, update) => {
      // if the item is in userItems, find and update the item
      if (update) {
        // create shallow copy of array
        let items = [...userItems];
        const index = items.findIndex(old => old._id === item._id);
        // replace original item with updated item
        items[index] = item;
        setUserItems(items);
      } else {
      // else add the new item
        setUserItems([...userItems, item]);
      }
    },
    removeUserItem: id => {
      let items = [...userItems];
      const index = items.findIndex(item => item._id === id);
      items.splice(index, 1);
      setUserItems(items);
    }
  };

  // template for tab navigator icons
  const TabNavIcon = ({icon}) => 
    <Image
      source={icon}
      fadeDuration={0}
      style={{ height: 24, width: 24 }}
    />
  ;
  
  const Loader = () => (
    <>
      <StyledButtonText>Loading</StyledButtonText>
      <Image
        source={require('./assets/loading-spinner.gif')}
        fadeDuration={0}
        style={{ height: 72, width: 72   }}
      />
    </>
  );

  const Login = () => (
    <>
      <StyledLogin disabled={!request} onPress={() => promptAsync()}>
        <StyledButtonText>Login with Google</StyledButtonText>
      </StyledLogin>
      <StyledLogin disabled={!request} onPress={handleCreatePress}>
        <StyledButtonText>Create an Account</StyledButtonText>
      </StyledLogin>
    </>
  );

  return (
    <RootSiblingParent>
      {userID ? (
        <UserContext.Provider value={contextValue}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home}
                options={{ tabBarIcon: () => <TabNavIcon icon={home}/>}}
              />
              <Tab.Screen name="Search" component={Search}
                options={{ tabBarIcon: () => <TabNavIcon icon={search}/>}}
              />
              <Tab.Screen name="Add" component={Add}
                options={{ tabBarIcon: () => <TabNavIcon icon={add}/>}}
              />
              <Tab.Screen name="Library" component={Library}
                options={{ tabBarIcon: () => <TabNavIcon icon={library}/>}}
              />
              <Tab.Screen name="Account" component={AccountScreen} />
            </Tab.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </UserContext.Provider>
      ) : (
          <StyledCenteredSafeArea>
            <StyledLoginView>
              {loading && <Loader />}
              {!loading && <Login />}
            </StyledLoginView>
        </StyledCenteredSafeArea>
        )
      }
    </RootSiblingParent>
  );
}
