import React, {useEffect, useState} from 'react';
import { TextInput, SectionList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyledSectionHeading, StyledSectionItem, StyledSectionList, StyledStandardSafeArea } from "../config/globalStyles";
import seedMovies from '../../movieData';

const SortedDisplay = ({navigation, route}) => {
    //TODO when sort option is selected, send req to server for new sorted list
    const { movies } = seedMovies;

    const { sortBy } = route.params || {sortBy: 'title'};
    const [sections, setSections] = useState(null);
    const [sortOrder, setSortOrder] = useState(sortBy.toLowerCase());

    useEffect(() => {
        sectionedList(sortBy);
    }, []);

    // create object of all movies where the key = first letter of the title and the value = array of all movies starting with the key
    const sortTitle = movies.reduce((obj, movie) => {
        let firstLetter = movie.title[0].toUpperCase();
        const ascii = firstLetter.charCodeAt();
        if (ascii >= 48 && ascii <= 57) {
            firstLetter = '#';
        }
        return {
            ...obj,
            [firstLetter]: [...(obj[firstLetter] || []), movie]
        }
    }, {});

    // create object of all movies where key = a genre and value = array of all movies in genre. Movie may appear in more than one genre
    const sortGenre = movies.reduce((obj, movie) => {
        movie.genre.forEach(genre => {
            obj[genre] = [...(obj[genre] || []), movie];
        });
        return obj;
    }, {});

    const sortActor = movies.reduce((obj, movie) => {
        movie.actors.forEach(actor => {
            obj[actor.fullName] = [...(obj[actor.fullName] || []), movie];
        });
        return obj;
    }, {});

    // create sections by sort type for SectionList
    const sectionedList = (sortValue) => {
        let value = sortValue.toLowerCase();
        let sortType;
        switch (value) {
            case 'title':
                sortType = sortTitle;
                break;
            case 'genre':
                sortType = sortGenre;
                break;
            case 'actor':
                sortType = sortActor;
                break;
            default:
                sortType = sortTitle;
        }

        const newSections = Object.keys(sortType).sort().map(item => ({
            heading: item,
            data: sortType[item]
        }));

        setSections(newSections);
    }

    return (
        <StyledStandardSafeArea>
            <Picker
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => {
                    sectionedList(itemValue);
                    setSortOrder(itemValue);
                }}
                selectedValue={sortOrder}
            >
                <Picker.Item label="Title" value="title" />
                <Picker.Item label="Genre" value="genre" />
                <Picker.Item label="Format" value="format" />
                <Picker.Item label="Actor" value="actor" /> //TODO get list of actor last names and sorted
                <Picker.Item label="Director" value="director" />
            </Picker>
            
            <TextInput
                onChangeText={() => console.log('text => onChangeText(text)')}
                value={console.log('value')}
            />
            <SectionList
                contentContainerStyle={StyledSectionList}
                sections={sections}
                renderSectionHeader={({ section: { heading } }) => <StyledSectionHeading>{heading}</StyledSectionHeading>}
                renderItem={({ item }) =>
                    <Pressable onPress={() => navigation.navigate('Movie Details', {movieDetails: item})}>
                        <StyledSectionItem>{item.title}</StyledSectionItem>
                    </Pressable>}
            />
        </StyledStandardSafeArea >
    );
}

export default SortedDisplay;