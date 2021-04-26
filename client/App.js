import React, { useEffect, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GOOGLE_CLIENT_ID_EXPO, GOOGLE_CLIENT_ID_WEB } from './secrets';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home, {Add, Library} from './src/navigators';
import SearchResult from './src/searchResults';
import { Button } from 'react-native';
import { StyledStandardSafeArea, StyledTextInput } from './src/config/globalStyles';

const Tab = createBottomTabNavigator();

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userID, setUserID] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID_EXPO,
    webClientId: GOOGLE_CLIENT_ID_WEB
  });
  const firstRender = useRef(true);

  useEffect(() => {
    googleLogin();
  }, [response]);
  
  useEffect(() => {
    // Prevent request from sending prior to login being clicked
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getUserInfoAsync(userID);
  }, [userID]);
  
  // User authenticates via Google and then use returned token to request user's Google profile
  const googleLogin = async () => {
    try {
      if (response?.type === 'success') {
        const { authentication } = response;
        let apiResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${authentication.accessToken}`
          },
        });

        if (!apiResponse.ok) {
          throw new Error(`Sorry there was an error. Please try again. Error ${apiResponse.status}`);
        }

        let json = await apiResponse.json();
        setUserID(json.email);
      }
    } catch (err) {
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const getUserInfoAsync = async userID => {
    try {
      let response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: userID
        })
      });
      let json = await response.json();
      setUserItems(json.ownedItems);
    } catch (err) {
      throw new Error(`Sorry there was an error. Please try again. Error ${err}`);
    }
  };

  const handleSignup = () => {
    setUserID('6071e1016ac38867d5e6e04f');
  };

  return (
    <>
      {userID ? (
        <>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Search" component={SearchResult} />
              <Tab.Screen name="Add" component={Add} />
              <Tab.Screen name="Library" component={Library} />
            </Tab.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </>
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
            onPress={() => {
              promptAsync();
              }}
          />
        </StyledStandardSafeArea>
      )

      }
    </>
  );
};
