import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { debounce } from 'lodash';
import { herokuServer, localServer, platform } from "../../App";
import { StyledCenteredSafeArea, StyledImage, StyledPressable, StyledRowView, StyledSmallText, ToastMessage } from '../config/globalStylesStyled';
import SearchBar from '../components/searchBar';
import { UserContext } from "../../App";
import ItemModal from '../components/modal';

// Item component that is rendered in Flatlist
const Item = ({ item, onPress }) => (
    <StyledRowView>
        <StyledPressable onPress={onPress}>
            <StyledSmallText>
                {item.title} ({item.releaseDate})
            </StyledSmallText>
            <StyledImage source={{ uri: item.imageURL }} />
        </StyledPressable>
    </StyledRowView>  
);

const AddItem = () => {
    const [itemToAdd, setItemToAdd] =useState(null);
    const [mediaType, setMediaType] = useState('Physical');
    const [pictureQuality, setPictureQuality] = useState('SD');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const {userID, updateItemList} = useContext(UserContext);
    const flatListRef = useRef();

    useEffect(() => {
        searchValue && debouncedGetDetails(searchValue);
    }, [searchValue]);

    const server = platform === 'web' ? localServer : herokuServer;
    
    // Request to apiRoutes to find results based on user search
    const getItemsFromTmdbAsync = async (text) => {
        try {
            let response = await fetch(`${server}/search`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchText: text
                })
            });
            let json = await response.json();
            setSearchResults(json);
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        } catch (error) {
            console.error(error);
        }
    };

    // Request to apiRoutes to get detail info on specific item
    const fetchSingleItemFromTmdb = async ({ id, media_type }) => {
        try {
            let response = await fetch(`${server}/search/${media_type}/${id}`);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    //use debounce when sending request to minimize api hits. Takes text from input
    const debouncedGetDetails = useCallback(
        debounce(text => getItemsFromTmdbAsync(text), 1200),
        []
    );

    // Triggered by pressing on item in the list of results
    const handlePress = item => {
        setItemToAdd(item);
    };

    // Query TMDB to get additional item details, then post to itemRoutes to save to mongoDB
    const handleSubmit = async (quality, media) => {
        try {
            const item = await fetchSingleItemFromTmdb(itemToAdd);
            let response = await fetch(`${server}/items`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item,
                    media,
                    quality,
                    userID
                })
            });
            let json = await response.json();
            if (json.newItem) {
                updateItemList(json.newItem);
                ToastMessage(json.message);
            } else {
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    // item template for FlatList
    const renderItem = ({ item }) => <Item onPress={() => handlePress(item)} item={item} />;

    return (
        <StyledCenteredSafeArea>
            <SearchBar stateUpdater={setSearchValue} value={searchValue} />
            {
                searchResults &&
                <FlatList
                    data={searchResults}
                    keyExtractor={item => `${item.id}`}
                    ref={flatListRef}
                    renderItem={renderItem}
                />
            }

            {
                itemToAdd &&
                <ItemModal
                    item={itemToAdd}
                    mediaType={mediaType}
                    modalOpen={setItemToAdd}
                    onSubmit={handleSubmit}
                    pictureQuality={pictureQuality}
                />
            }
        </StyledCenteredSafeArea>
    );
}

export default AddItem;