import React, { useEffect, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { GOOGLE_CLIENT_ID_EXPO, GOOGLE_CLIENT_ID_WEB } from './secrets';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home, {Add, Library, Search} from './src/navigators';
import { Button, Platform } from 'react-native';
import { StyledStandardSafeArea, StyledTextInput } from './src/config/globalStyles';
import SearchBar from "./src/components/searchBar";

export const UserContext = React.createContext();
const Tab = createBottomTabNavigator();

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

export default function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userItems, setUserItems] = useState(null);
  
  const discovery = useAutoDiscovery('https://dev-14030156.okta.com/oauth2/default');
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '0oannsb0s70Gj7qpF5d6',
      scopes: ['openid', 'profile'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'com.okta.dev-14030156.okta.com:/callback',
        useProxy,
      }),
    },
    discovery
  );
  const firstRender = useRef(true);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);

  // useEffect(() => {
  //   googleLogin();
  // }, [response]);
  
  useEffect(() => {
    // Prevent request from sending prior to login being clicked
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getUserInfoAsync(userName);
  }, [userName]);
  
  // User authenticates via Google and then use returned token to request user's Google profile
  const googleLogin = async () => {
    try {
      if (response?.type === 'success') {
        const test = response;
        console.log(test);
        let apiResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authentication.accessToken}`
          },
        });

        if (!apiResponse.ok) {
          throw new Error(`Sorry there was an error. Please try again. Error ${apiResponse.status}`);
        }

        let json = await apiResponse.json();
        setUserName(json.email);
      }
    } catch (err) {
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const getUserInfoAsync = async id => {
    try {
      let response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: id
        })
      });
      let json = await response.json();
      setUserID(json.userID);
      setUserItems(json.userItems);
    } catch (err) {
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const handleSignup = () => {
    setUserName('test1');
  };

  const contextValue = {
    userID,
    userItems,
    userName,
    updateItemList: (items) => setUserItems(items)
  };

  return (
    <RootSiblingParent>
      {userItems ? (
        <UserContext.Provider value={contextValue}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Search" component={Search} />
              <Tab.Screen name="Add" component={Add} />
              <Tab.Screen name="Library" component={Library} />
            </Tab.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </UserContext.Provider>
      ) : (
        <StyledStandardSafeArea>
          <StyledTextInput
            placeholder='username'
          />
          <StyledTextInput
            placeholder='password'
          />
            
          <Button
            disabled={!request}
            title="Login with Google"
            onPress={handleSignup}
          />
        </StyledStandardSafeArea>
        )
      }
    </RootSiblingParent>
  );
}
