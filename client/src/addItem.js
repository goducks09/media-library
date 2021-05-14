import React, { useCallback, useContext, useEffect, useState } from 'react';
import { debounce, first } from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { StyledButtonText, StyledCenteredSafeArea, StyledImage, StyledPressable, StyledRoundedButton, StyledRowView, StyledSmallText, StyledTextInput } from './config/globalStyles';
import { FlatList } from 'react-native';
import SearchBar from './components/searchBar';
import { UserContext } from "../App";


const Item = ({ item, onPress }) => (
    <StyledRowView>
        <StyledPressable onPress={onPress}>
            <StyledSmallText>
                {item.title} ({item.year})
            </StyledSmallText>
            <StyledImage source={{ uri: item.posterURL }} />
        </StyledPressable>
    </StyledRowView>  
);

const AddItem = () => {
    const [itemToAdd, setItemToAdd] =useState(null);
    const [format, setFormat] = useState('Physical');
    const [pictureQuality, setPictureQuality] = useState('SD');
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const {userID, updateItemList} = useContext(UserContext);

    useEffect(() => {
        searchValue && debouncedGetDetails(searchValue);
    }, [searchValue]);
    
    // Request to apiRoutes to find results based on user search
    const getItemsFromTmdbAsync = async (text) => {
        try {
            let response = await fetch(`http://localhost:3000/search`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchText: text
                })
            });
            let json = await response.json();
            setSearchResults(json);;
        } catch (error) {
            console.error(error);
        }
    };

    // Request to apiRoutes to get detail info on specific item
    const fetchSingleItemFromTmdb = async ({ id, media_type }) => {
        try {
            let response = await fetch(`http://localhost:3000/search/${media_type}/${id}`);
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
    const handleSubmit = async () => {
        try {
            const item = await fetchSingleItemFromTmdb(itemToAdd);
            let response = await fetch(`http://localhost:3000/items`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID,
                    item,
                    format,
                    pictureQuality
                })
            });
            let json = await response.json();
            if (json.userItems) {
                updateItemList(json.userItems);
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
            <SearchBar stateUpdater={ setSearchValue } value={searchValue} />
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

                <>
                    <StyledSmallText>Choose quality: </StyledSmallText>
                    <Picker
                        selectedValue={pictureQuality}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => {
                            setPictureQuality(itemValue);
                        }
                        }>
                        <Picker.Item label="SD" value="SD" />
                        <Picker.Item label="HD" value="HD" />
                        <Picker.Item label="4K" value="4K" />
                    </Picker>

                    <StyledSmallText>Choose format: </StyledSmallText>
                    <Picker
                        selectedValue={format}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) =>
                            setFormat(itemValue)
                        }>
                        <Picker.Item label="Physical" value="Physical" />
                        <Picker.Item label="Digital" value="Digital" />
                    </Picker>
                    
                    <StyledImage source={{ uri: itemToAdd.posterURL }} />
                    <StyledSmallText>
                        {itemToAdd.title} ({itemToAdd.year})
                    </StyledSmallText>

                    <StyledRoundedButton onPress={handleSubmit}>
                        <StyledButtonText>Add to Collection?</StyledButtonText>
                    </StyledRoundedButton>
                </>
            }
        </StyledCenteredSafeArea>
    );
}

export default AddItem;