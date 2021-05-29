import React, { useContext, useState } from 'react';
import Fuse from 'fuse.js';
import SearchBar from './components/searchBar';
import ThumbnailItem from "./components/thumbnailItem";
import { StyledRowView, StyledStandardSafeArea } from './config/globalStyles';
import { UserContext } from "../App";

const SearchResult = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');
    const { userItems } = useContext(UserContext);

    // Fuse fuzzy search setup
    const options = {
        // Search in 'format', 'actors', 'director', and 'title' to find match. Higher weight = higher in search result. Default = 1
        keys: [
            'format',
            { name: 'itemID.actors.fullName', weight: 2.5 },
            { name: 'itemID.director.fullName', weight: 1.5 },
            { name: 'itemID.title', weight: 5 }
        ]
    };
    const fuse = new Fuse(userItems, options);
    const result = fuse.search(searchValue);
    console.log(result);

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