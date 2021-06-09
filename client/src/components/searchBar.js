import React, {useEffect, useRef, useState} from 'react';
import { StyledTextInput } from '../config/globalStyles';

const SearchBar = (props, ref) => {
    const searchBar = useRef(null);
    const [focus, setFocus] = useState(false);

    // when searchbar has rendered, auto focus
    useEffect(() => {
        if (searchBar.current) {
            searchBar.current.focus();
        }
    }, []);

    const { stateUpdater } = props;
    const onChangeText = (text, stateUpdater) => {
        stateUpdater(text);
    };

    return (
        <StyledTextInput
            focus={focus}
            onBlur={() => setFocus(false)}
            onChangeText={text => onChangeText(text, stateUpdater)}
            onFocus={() => setFocus(true)}
            placeholder={'Search....'}
            ref={searchBar}
        />
    );
};

export default SearchBar;