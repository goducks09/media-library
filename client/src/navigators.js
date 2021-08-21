import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddItem from './screens/addItem';
import HomeScreen from './screens/homeScreen';
import Item from './screens/item';
import SearchResult from "./screens/searchResults";
import SortedDisplay from './screens/libraryScreen';

const AddItemStack = createStackNavigator();
const HomeStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const SearchStack = createStackNavigator();

const headerOptions = {
    headerStyle: {
        backgroundColor: '#151515',
        borderBottomWidth: 0,
        borderColor: '#151515',
        shadowOffset: {height: 0}
    },
    headerTintColor: '#00C6CF',
    headerTitleStyle: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center'
    }
};

export const Add = () => {
    return (
        <AddItemStack.Navigator
        initialRouteName="Add"
            screenOptions={headerOptions}
        >
            <AddItemStack.Screen component={AddItem} name="Add" />
            <AddItemStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.title })} />
        </AddItemStack.Navigator>
    );
};

const Home = () => {
    return (
        <HomeStack.Navigator
            initialRouteName="Home View"
            screenOptions={headerOptions}
        >
            <HomeStack.Screen component={HomeScreen} name="Home View" options={{ title: 'Media Library' }} />
            <HomeStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.title })} />
            <HomeStack.Screen component={SortedDisplay} name="Library" />
        </HomeStack.Navigator>
    );
};

export const Library = () => {
    return (
        <LibraryStack.Navigator
            initialRouteName="Library"
            screenOptions={headerOptions}
        >
            <LibraryStack.Screen component={SortedDisplay} name="Library" />
            <LibraryStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.title })} />
        </LibraryStack.Navigator>
    );
};

export const Search = () => {
    return (
        <SearchStack.Navigator
            initialRouteName="Search"
            screenOptions={headerOptions}
        >
            <SearchStack.Screen component={SearchResult} name="Search" />
            <SearchStack.Screen component={Item} name="Item Details" options={({ route }) => ({ title: route.params.title })} />
        </SearchStack.Navigator>
    );
};

export default Home;