import React, {useState} from 'react';
import { Text } from 'react-native';
import SearchBar from './components/searchBar';
import { StyledStandardSafeArea } from './config/globalStyles';

const SearchResult = () => {
    const [searchValue, setSearchValue] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <StyledStandardSafeArea>
            <Text>Search</Text>
            <SearchBar stateUpdater={setSearchValue} />
            {searchResults &&
                searchResults.map(result => {
                    <Text>Movie</Text>
                })
            }
        </StyledStandardSafeArea>
  );
}

export default SearchResult;