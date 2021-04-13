import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { StyledButtonText, StyledCenteredSafeArea, StyledImage, StyledPressable, StyledRoundedButton, StyledRowView, StyledSmallText, StyledTextInput } from './config/globalStyles';
import { FlatList, Pressable } from 'react-native';
import TMDB_API_KEY from '../secrets';
import SearchBar from './components/searchBar';

const Item = ({ item, handlePress }) => (
    <StyledRowView>
        <StyledPressable onPress={handlePress}>
            <StyledSmallText>
                {item.title} ({item.year})
            </StyledSmallText>
            <StyledImage source={{ uri: item.posterURL }} />
        </StyledPressable>
    </StyledRowView>  
);

const AddItem = () => {
    const [itemToAdd, setItemToAdd] =useState(null);
    const [format, setFormat] = useState(null);
    const [pictureQuality, setPictureQuality] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        searchValue && debouncedGetDetails(searchValue);
    }, [searchValue]);

    // send the query parameters but do the api call from backend
    // MAKE SURE TO USE API KEY AS A HEADER AND NOT IN THE URL
    const getItemsFromApiAsync = async (text) => {
        try {
            let response = await fetch(`http://localhost:3000/items`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: '6071e1016ac38867d5e6e04f',
                    searchText: text
                })
            });
            let json = await response.json();
            console.log(json);
            // let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${text}&page=1&adult=false`);
            // let json = await response.json();
            // console.log(json.results);
            // return json.results;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSingleItemFromApi = async (id, media_type) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false&append_to_response=credits`);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    //manipulate results from API call to only get details needed for displaying
    const getDetails = (text) => {
        getItemsFromApiAsync(text)
        .then(results => {
            let resultList = [];
            results.forEach(result => {
                if (result.media_type !== 'person') {
                    let { first_air_date, id, media_type, name, poster_path, release_date, title } = result;
                    if (media_type === 'tv') {
                        title = name;
                        release_date = first_air_date;
                    }
                    if (title.length > 20) title = title.slice(0, 17).concat('...');
                    const year = release_date.substring(0, 4);
                    const resultItem = {
                        id,
                        media_type,
                        title,
                        year,
                        posterURL: `https://image.tmdb.org/t/p/w92/${poster_path}`
                    };
                    resultList.push(resultItem);
                }
            });
            setSearchResults(resultList);
        });
    }

    //use debounce when sending request to minimize api hits. Takes text from input
    const debouncedGetDetails = useCallback(
        debounce(text => getDetails(text), 1500),
        []
    );

    const handlePress = async (id, media_type) => {
        const item = await fetchSingleItemFromApi(id, media_type);
        setItemToAdd(item);
    };

    // item template for FlatList
    const renderItem = ({ item }) => <Item onPress={() => handlePress(item.id, item.media_type)} item={item} />;

    return (
        <StyledCenteredSafeArea>
            <SearchBar stateUpdater={ setSearchValue } value={searchValue} />
            {
                searchResults &&
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            }
            <Picker
                selectedValue={pictureQuality}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => {
                    setPictureQuality(itemValue);
                }
                }>
                <Picker.Item label="SD" value="sd" />
                <Picker.Item label="HD" value="hd" />
                <Picker.Item label="4K" value="4k" />
            </Picker>

            <Picker
                selectedValue={format}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) =>
                    setFormat(itemValue)
                }>
                <Picker.Item label="Physical" value="physical" />
                <Picker.Item label="Digital" value="digital" />
            </Picker>

            <StyledRoundedButton>
                <StyledButtonText>Add to Collection?</StyledButtonText>
            </StyledRoundedButton>
            {itemToAdd && <Item item={itemToAdd} /> }
        </StyledCenteredSafeArea>
    );
}

export default AddItem;