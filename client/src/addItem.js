import React, { useCallback, useContext, useEffect, useState } from 'react';
import { debounce, first } from 'lodash';
import { StyledButtonText, StyledCenteredSafeArea, StyledImage, StyledModalView, StyledPicker, StyledPressable, StyledRoundedButtonWide, StyledRowView, StyledSmallText, ToastMessage } from './config/globalStylesStyled';
import { FlatList, Modal } from 'react-native';
import SearchBar from './components/searchBar';
import { UserContext } from "../App";
import ItemModal from './components/modal';

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

    useEffect(() => {
        searchValue && debouncedGetDetails(searchValue);
    }, [searchValue]);

    const serverURL = 'https://floating-dawn-94898.herokuapp.com';
    // const serverURL = 'http://localhost:3000';
    
    // Request to apiRoutes to find results based on user search
    const getItemsFromTmdbAsync = async (text) => {
        try {
            let response = await fetch(`${serverURL}/search`, {
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
        } catch (error) {
            console.error(error);
        }
    };

    // Request to apiRoutes to get detail info on specific item
    const fetchSingleItemFromTmdb = async ({ id, media_type }) => {
        try {
            let response = await fetch(`${serverURL}/search/${media_type}/${id}`);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    //manipulate results from API call to only get details needed for displaying
    // const getDetails = (text) => {
    //     getItemsFromTmdbAsync(text)
    //     .then(resultList => {
            // let resultList = [];
            // results.forEach(result => {
            //     if (result.media_type !== 'person') {
            //         let { first_air_date, id, media_type, name, poster_path, release_date, title } = result;
            //         console.log('type: ', media_type);
            //         console.log('title: ', title);
            //         console.log('name: ', name);
            //         if (!title) title = name;
            //         if (!release_date) release_date = first_air_date;
            //         if (title.length > 20) title = title.slice(0, 17).concat('...');
            //         let year;
            //         release_date ? year = release_date.substring(0, 4) : year = '';
            //         const resultItem = {
            //             id,
            //             media_type,
            //             posterURL: `https://image.tmdb.org/t/p/w92/${poster_path}`,
            //             title,
            //             year
            //         };
            //         resultList.push(resultItem);
            //     }
            // });
            // setSearchResults(resultList);
    //     });
    // }

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
            let response = await fetch(`${serverURL}/items`, {
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
                // ToastMessage(json.message);
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
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
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