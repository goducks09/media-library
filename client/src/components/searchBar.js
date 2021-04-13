import React from 'react';
import { StyledTextInput } from '../config/globalStyles';

const SearchBar = (props) => {
    const { stateUpdater, value } = props;
    const onChangeText = (text, stateUpdater) => {
        stateUpdater(text);
    };

    return (
        <StyledTextInput
            autoFocus={true}
            onChangeText={text => onChangeText(text, stateUpdater)}
            placeholder={'Search....'}
        />
    );
};

export default SearchBar;