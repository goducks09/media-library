import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import Movie from './movie';
import SortedDisplay from './screens/sortedDisplay';

const Stack = createStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home View"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#404040',
                    borderBottomWidth: 0
                },
                headerTintColor: '#00C6CF',
                headerTitleStyle: {
                    fontSize: 38,
                    fontWeight: 'bold',
                    textAlign: 'center'
                },
            }}
        >
            <Stack.Screen component={HomeScreen} name="Home View" options={{ title: 'Movie Library' }} />
            <Stack.Screen component={Movie} name="Movie Details" options={({ route }) => ({ title: route.params.movieDetails.title })}/>
            <Stack.Screen component={SortedDisplay} name="Library" />
        </Stack.Navigator>
    );
}

export default Home;