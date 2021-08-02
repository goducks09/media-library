import React, {useContext, useEffect, useState} from 'react';
import { SectionList, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyledPickerContainer, StyledSectionHeading, StyledSectionItem, StyledSectionList, StyledStandardSafeArea } from "../config/globalStylesStyled";
import { UserContext } from "../../App";

const SortedDisplay = ({navigation, route}) => {
    const {userItems} = useContext(UserContext);

    const { sortBy } = route.params || {sortBy: 'title'};
    const [sections, setSections] = useState(null);
    const [sortOrder, setSortOrder] = useState(sortBy.toLowerCase());

    useEffect(() => {
        sectionedList(sortBy);
    }, [userItems]);


    // function to ignore articles when sorting strings
    const ignoreArticles = string => {
        const articles = ['A', 'An', 'The'];
        const words = string.split(' ');
        if (words.length > 1 && articles.includes(words[0])) {
            string = words[1];
        }
        return string;
    }
    // create object of all movies where the key = first letter of the title and the value = array of all movies starting with the key
    const sortTitle = userItems.reduce((obj, item) => {
        let { title } = item.itemID;
        title = ignoreArticles(title);
        if (title.length > 30) item.itemID.title = title.slice(0, 30).concat('...');
        
        let firstLetter = title[0].toUpperCase();
        const ascii = firstLetter.charCodeAt();
        if (ascii >= 48 && ascii <= 57) {
            firstLetter = '#';
        }
        return {
            ...obj,
            [firstLetter]: [...(obj[firstLetter] || []), item]
        }
    }, {});

    // create object where key = name and value = array of all movies they star in. Takes arg to look at actor or director
    const sortName = personCategory => {
        return userItems.reduce((obj, item) => {
            item.itemID[personCategory].forEach(person => {
                obj[person.fullName] = [...(obj[person.fullName] || []), item];
            });
            return obj;
        }, {});
    };

    // create object of all movies where key = genre and value = array of all movies in genre. Movie may appear in more than one genre
    const sortGenre = userItems.reduce((obj, item) => {
        item.itemID.genre.forEach(genre => {
            obj[genre] = [...(obj[genre] || []), item];
        });
        return obj;
    }, {});
    
    // create object of all movies where key = picture quality and value = array of all movies in that quality.
    const sortPictureQuality = userItems.reduce((obj, item) => {
        return {
            ...obj,
            [item.pictureQuality]: [...(obj[item.pictureQuality] || []), item]
        }
    }, {});
    

    // create sections by sort type for SectionList
    const sectionedList = sortValue => {
        let value = sortValue.toLowerCase();
        let sortType;
        switch (value) {
            case 'title':
                sortType = sortTitle;
                break;
            case 'actor':
                sortType = sortName('actors');
                break;
            case 'director':
                sortType = sortName('director');
                break;
            case 'genre':
                sortType = sortGenre;
                break;
            case 'pq':
                sortType = sortPictureQuality;
                break;
            default:
                sortType = sortTitle;
        }

        const newSections = Object.keys(sortType).sort().map(item => {
            const sortItems = sortType[item].sort((a, b) => {
                const titleA = ignoreArticles(a.itemID.title);
                const titleB = ignoreArticles(b.itemID.title);
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });

            return {
                heading: item,
                data: sortItems
            }
        });

        setSections(newSections);
    }

    return (
        <StyledStandardSafeArea>
            <StyledPickerContainer>
                <Picker
                    dropdownIconColor={'#00C6CF'}
                    onValueChange={(itemValue) => {
                        sectionedList(itemValue);
                        setSortOrder(itemValue);
                    }}
                    selectedValue={sortOrder}
                    style={{ color: '#00C6CF' }}
                >
                    <Picker.Item label="Title" value="title" />
                    <Picker.Item label="Actor" value="actor" />
                    <Picker.Item label="Director" value="director" />
                    <Picker.Item label="Genre" value="genre" />
                    <Picker.Item label="PQ" value="pq" />
                </Picker>
            </StyledPickerContainer>

            <SectionList
                contentContainerStyle={StyledSectionList}
                sections={sections}
                keyExtractor={(item, index) => item.itemID._id}
                renderSectionHeader={({ section: { heading } }) => <StyledSectionHeading>{heading}</StyledSectionHeading>}
                renderItem={({ item }) =>
                    <Pressable onPress={() => navigation.navigate('Item Details', {itemID: item.itemID._id, title: item.itemID.title})}>
                        <StyledSectionItem>{item.itemID.title}</StyledSectionItem>
                    </Pressable>}
            />
        </StyledStandardSafeArea >
    );
}

export default SortedDisplay;