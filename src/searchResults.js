import React, {useState} from 'react';
import { Text, TextInput } from 'react-native';

const SearchResult = () => {
    const [value, onChangeText] = useState('Useless Placeholder');
    const [results, setResults] = useState([]);

    return (
        <>
            <Text>Search</Text>
            <TextInput
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            {results &&
                results.map(result => {
                    <Movie />
                })
            }
        </>
  );
}

export default SearchResult;