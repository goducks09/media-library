import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import Item from './item';
import SortedDisplay from './screens/libraryScreen';
import AddItem from './addItem';

const HomeStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const AddItemStack = createStackNavigator();

const Home = () => {
    return (
        <HomeStack.Navigator
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
            <HomeStack.Screen component={HomeScreen} name="Home View" options={{ title: 'Media Library' }} />
            <HomeStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.itemDetails.itemID.title })} />
            <HomeStack.Screen component={SortedDisplay} name="Library" />
        </HomeStack.Navigator>
    );
};

export const Library = () => {
    return (
        <LibraryStack.Navigator
            initialRouteName="Library"
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
            <LibraryStack.Screen component={SortedDisplay} name="Library" />
            <LibraryStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.itemDetails.itemID.title })} />
        </LibraryStack.Navigator>
    );
};

export const Add = () => {
    return (
        <AddItemStack.Navigator
            initialRouteName="Add"
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
            <AddItemStack.Screen component={AddItem} name="Add" />
            <AddItemStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.itemDetails.itemID.title })} />
        </AddItemStack.Navigator>
    );
};

export default Home;