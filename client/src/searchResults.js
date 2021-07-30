import React, { useContext, useState } from 'react';
import Fuse from 'fuse.js';
import SearchBar from './components/searchBar';
import ThumbnailItem from "./components/thumbnailItem";
import { StyledRowViewWide, StyledStandardSafeArea } from './config/globalStylesStyled';
import { UserContext } from "../App";

const SearchResult = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');
    const { userItems } = useContext(UserContext);

    // Fuse fuzzy search setup
    const options = {
        // Search in 'actors', 'director', and 'title' to find match. Higher weight = higher in search result. Default = 1
        keys: [
            { name: 'itemID.actors.fullName', weight: 2.5 },
            { name: 'itemID.director.fullName', weight: 1.5 },
            { name: 'itemID.title', weight: 5 }
        ]
    };
    const fuse = new Fuse(userItems, options);
    const result = fuse.search(searchValue);

    const handleItemPress = item => {
        navigation.navigate('Item Details', { itemID: item.itemID._id, title: item.itemID.title });
    };

    return (
        <StyledStandardSafeArea>
            <SearchBar stateUpdater={setSearchValue} value={searchValue} />
            <StyledRowViewWide>
                {
                    result &&
                    result.map(i =>
                        <ThumbnailItem item={i.item} key={i.item._id} onPress={handleItemPress} />
                    )
                }
            </StyledRowViewWide>
        </StyledStandardSafeArea>

    );
};

export default SearchResult;