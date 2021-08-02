import React, {useEffect, useRef, useState} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StyledTextInput, StyledTextInputContainer } from '../config/globalStylesStyled';

const SearchBar = (props, ref) => {
    const searchBar = useRef(null);
    const [focus, setFocus] = useState(false);
    const { stateUpdater, value } = props;

    // when searchbar has rendered, auto focus
    useEffect(() => {
        if (searchBar.current) {
            searchBar.current.focus();
        }
    }, []);

    return (
        <StyledTextInputContainer>
            <StyledTextInput
                focus={focus}
                onBlur={() => setFocus(false)}
                onChangeText={text => stateUpdater(text)}
                onFocus={() => setFocus(true)}
                placeholder={'Search....'}
                placeholderTextColor={'#00C6CF'}
                ref={searchBar}
                value={value}
            />
            <TouchableOpacity onPress={() => stateUpdater('')}>
                <Image
                    source={require('../../assets/cancel-48.png')}
                    fadeDuration={0}
                    style={{ height: 16, margin: 10, width: 16 }}
                />
            </TouchableOpacity>
        </StyledTextInputContainer>
    );
};

export default SearchBar;