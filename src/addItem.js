import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { StyledButtonText, StyledCenteredSafeArea, StyledImage, StyledRoundedButton, StyledRowView, StyledSmallText, StyledTextInput } from './config/globalStyles';
import { FlatList, Pressable } from 'react-native';

const { REACT_NATIVE_TMDB_API_KEY } = process.env;

const Item = ({ id, onPress, posterURL, title, year  }) => (
    <StyledRowView>
        <Pressable onPress={onPress}>
            <StyledSmallText>
                {title}
            </StyledSmallText>
            <StyledSmallText>
                {year}
            </StyledSmallText>
            <StyledImage source={{ uri: posterURL }} />
        </Pressable>
    </StyledRowView>  
);

const AddItem = () => {
    const [format, setFormat] = useState(null);
    const [pictureQuality, setPictureQuality] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        searchValue && debouncedGetDetails(searchValue);
    }, [searchValue]);

    // send the query parameters but do the api call from backend
    // MAKE SURE TO USE API KEY AS A HEADER AND NOT IN THE URL
    const getMoviesFromApiAsync = async (text) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${REACT_NATIVE_TMDB_API_KEY}&language=en-US&query=${text}&page=1`);
            let json = await response.json();
            console.log(json.results);
            return json.results;
        } catch (error) {
            console.error(error);
        }
    };

    //manipulate results from API call to only get details needed for displaying
    const getDetails = (text) => {
        getMoviesFromApiAsync(text)
        .then(results => {
            let resultList = [];
            results.forEach(result => {
                if (result.media_type !== 'person') {
                    let { first_air_date, id, media_type, name, poster_path, release_date, title } = result;
                    if (media_type === 'tv') {
                        title = name;
                        release_date = first_air_date;
                    }
                    const year = release_date.substring(0, 4);
                    const resultItem = {
                        id,
                        title,
                        year,
                        posterURL: `https://image.tmdb.org/t/p/w92/${poster_path}`
                    };
                    resultList.push(resultItem);
                }
            });
            console.log(resultList);
            setSearchResults(resultList);
        });
    }

    //use debounce when sending request to minimize api hits. Takes text from input
    const debouncedGetDetails = useCallback(
        debounce(text => getDetails(text), 1500),
        []
    );

    const onChangeText = (text) => {
        setSearchValue(text);
    };

    const onPress = (e) => {
        e.id
    };

    // item template for FlatList
    const renderItem = ({ item }) => <Item onPress={onPress} posterURL={item.posterURL} title={item.title} year={item.year} />;

    return (
        <StyledCenteredSafeArea>
            <StyledTextInput
                autoFocus={true}
                onChangeText={text => onChangeText(text)}
            />
            {
                searchResults &&
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
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
                <StyledButtonText>Add to Collection</StyledButtonText>
            </StyledRoundedButton>
        </StyledCenteredSafeArea>
    );
}

export default AddItem;