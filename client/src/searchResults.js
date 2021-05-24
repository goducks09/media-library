import React, { useContext, useState } from 'react';
import Fuse from 'fuse.js';
import SearchBar from './components/searchBar';
import ThumbnailItem from "./components/thumbnailItem";
import { StyledRowView, StyledStandardSafeArea } from './config/globalStyles';
import { UserContext } from "../App";

const SearchResult = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { userItems } = useContext(UserContext);

    // TODO weight title highest, then actor, director, format
    // Fuse fuzzy search setup
    const options = {
        // Search in 'format', 'actors', 'director', and 'title' to find match
        keys: ['format', 'itemID.actors.fullName', 'itemID.director.fullName', 'itemID.title']
    };
    const fuse = new Fuse(userItems, options);
    const result = fuse.search(searchValue);

    const handleItemPress = item => {
        navigation.navigate('Item Details', { itemDetails: item });
    };

    return (
        <StyledStandardSafeArea>
            <SearchBar stateUpdater={setSearchValue} />
            <StyledRowView>
                {
                    result &&
                    result.map(i =>
                        <ThumbnailItem item={i.item} key={i.item._id} onPress={handleItemPress} />
                    )
                }
            </StyledRowView>
        </StyledStandardSafeArea>

    );
};

export default SearchResult;