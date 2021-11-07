import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home, { Add, Library, Search } from './src/navigators';
import AccountScreen from "./src/screens/account";
import { Image, Platform, useWindowDimensions } from 'react-native';
import { StyledButtonText, StyledCenteredSafeArea, StyledLogin, StyledLoginView, ToastMessage } from './src/config/globalStylesStyled';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

//Environment settings
export const platform = Platform.OS;
export const herokuServer = 'https://floating-dawn-94898.herokuapp.com';
export const devServer = 'https://powerful-bastion-78639.herokuapp.com';
export const localServer = 'http://localhost:3000';
const server = platform === 'web' ? localServer : herokuServer;

// Navigation
const Tab = createBottomTabNavigator();
  // For web: closes window popup when auth complete
WebBrowser.maybeCompleteAuthSession();

export const UserContext = React.createContext();

export default function App() {
  const [addNew, setAddNew] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    expoClientId: '421500213015-sffcon0liumjdu9qqskq99qc9jgblboh.apps.googleusercontent.com',
    webClientId: '421500213015-0ha9ogc3m9s547k1k6ptj6b7ddo2dcmm.apps.googleusercontent.com'
  });

  // makes sure icons are loaded prior to displaying screen
  const loadAssetsAsync = async () => {
    await Font.loadAsync(MaterialCommunityIcons.font);
  };

  // Get device dimensions for use in React Context
  const deviceDimensions = {
    height: useWindowDimensions().height,
    width: useWindowDimensions().width
  }
  
  useEffect(() => {
    (async () => {
      const user = await SecureStore.getItemAsync('authenticatedUser');
      const key = await SecureStore.getItemAsync('key');
      if (user && key) {
        getUserInfo(user, key);
      }
    })()
  }, []);

  // Request authentication through Google when clicking "Create Account" or "Google Login"
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      googleAuth(authentication);
    } else if (response?.type === 'error') {
      ToastMessage('Your account could not be authenticated. Please try again. If you are using 2-step verification, you may need to make sure your device is listed as trusted in your Google account.');
    }
  }, [response]);
  
  // Use Google auth to get user information and either create new account or update the user key
  const googleAuth = async (authentication) => {
    try {
      if (response?.type === 'success') {
        const googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authentication.accessToken}`
          },
        });
        if (!googleResponse.ok) {
          ToastMessage(`Sorry there was an error. Please try again. Error here ${googleResponse.status}`);
        } else {
          const json = await googleResponse.json();
          const username = json.email;
          const key = authentication.accessToken;
          setLoading(true);
          addNew ? createAccount(username, key) : updateUserAndLogin(username, key);
        }
      }
    } catch (err) {
        ToastMessage(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  // For use when username and key are stored in SecureStore to login user
  const getUserInfo = async (username, key) => {
    try {
      setLoading(true);
      let response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          key
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
      ToastMessage(`Sorry there was an error. Please try again. Error ${err.message}`);
    }
  };

  // For "Create Account" login option. 
  const createAccount = async (username, key) => {
    try {
      let response = await fetch(`${server}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          key
        })
      });
      let json = await response.json();
      setLoading(false);
      ToastMessage(json.message);

      if (json.userID) {
        setUserID(json.userID);
        SecureStore.setItemAsync('authenticatedUser', username);
        SecureStore.setItemAsync('key', key);
      }
    } catch (err) {
      setLoading(false);
      ToastMessage(`Sorry there was an error. Please try again. Error ${err.message}`);
    }

    setAddNew(false);
  };

  const handleCreatePress = () => {
    setAddNew(true);
    promptAsync();
  };

  // For "Google Login" option. Make request to DB to update authorization key and login user
  const updateUserAndLogin = async (username, key) => {
    try {
      const updateDb = await fetch(`${server}/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          key
        })
      });
      const updatedJson = await updateDb.json();
      if (!updateDb.ok) {
        setLoading(false);
        ToastMessage(`${updatedJson.message}`);
      } else {
        SecureStore.setItemAsync('authenticatedUser', username);
        SecureStore.setItemAsync('key', key);
      
        setLoading(false);

        if (updatedJson.userData) {
          setUserID(updatedJson.userData.userID);
          setUserItems(updatedJson.userData.userItems);
        }
      }
    } catch (err) {
      setLoading(false);
      ToastMessage(`Sorry there was an error. Please try again. Error ${err.message}`);
    }
  };

  // React Context setup
  const contextValue = {
    userID,
    userItems,
    logoutUser: async deleted => {
      // deleteItemAsync only returns value on rejection
      const deleteUserFailure = await SecureStore.deleteItemAsync('authenticatedUser');
      const deleteKeyFailure = await SecureStore.deleteItemAsync('key');

      if (!deleteUserFailure && !deleteKeyFailure) {
        setUserID(null);
        setUserItems([]);
        !deleted ? ToastMessage('You have been logged out') : null;
      } else {
        ToastMessage(`Sorry we ran into an error. Please reload the app.`);
      }
    },
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
    },
    deviceDimensions
  };
  
  const Loader = () => (
    <>
      <StyledButtonText>Loading</StyledButtonText>
      <Image
        source={require('./assets/loading-spinner.gif')}
        fadeDuration={0}
        style={{ height: 72, width: 72 }}
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

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <RootSiblingParent>
      {userID ? (
        <UserContext.Provider value={contextValue}>
          <NavigationContainer>
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: '#E90C59',
                inactiveTintColor: '#000'
              }}
            >
              <Tab.Screen name="Home" component={Home}
                options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" size={24} color={color} />}}
              />
              <Tab.Screen name="Search" component={Search}
                options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="magnify" size={24} color={color} />}}
              />
              <Tab.Screen name="Add" component={Add}
                options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="plus-circle" size={24} color={color} />}}
              />
              <Tab.Screen name="Library" component={Library}
                options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="bookshelf" size={24} color={color} />}}
              />
              <Tab.Screen name="Account" component={AccountScreen}
                options={{ title: 'Account', tabBarIcon: ({color}) => <MaterialCommunityIcons name="account-cog" size={24} color={color} />}}
              />
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
