import React, { useReducer } from 'react';
import { Image, Text, View } from 'react-native';
import { StyledRegularText, StyledSmallText, StyledCenteredSafeArea, StyledSectionItem } from './config/globalStyles';

const initialState = {
    actors: [], //TODO needs to be an array of obj {firstName, lastName, fullName}
    dateAdded: '',
    director: [],
    format: [], //TODO needs to take input and comma separate (e.g. "4K Blu-ray Physical" => ["4K", "Blu-ray", "Physical"])
    genre: [],
    imageURL: '',
    releaseDate: 0,
    runTime: 0,
    title: '',
    userTag: [],
}

const reducer = () => {
    console.log('reducer');
}

const Item = ({route}) => {
    const [movie, setMovie] = useReducer(reducer, initialState);
    const { itemDetails } = route.params;
    console.log(itemDetails);
    return (
        <StyledCenteredSafeArea>
            <Image
                source={itemDetails.itemID.imageURL}
                style={{ height: 268, width: 182, resizeMode: 'contain' }}
            />
            <View>
                <StyledRegularText>Starring:</StyledRegularText>
                {/* only get first 5 actors to show */}
                {itemDetails.itemID.actors.slice(0,5).map((actor, index) => 
                    <StyledSectionItem key={index}>{actor.fullName}</StyledSectionItem>
                )}

                {/* If an item is a tv show, it won't have a run time, so don't display */}
                {itemDetails.itemID.runTime && <StyledRegularText>Runtime: <StyledSmallText>{itemDetails.itemID.runTime} min</StyledSmallText></StyledRegularText>}
                <StyledRegularText>Genre:
                        {itemDetails.itemID.genre.map((genre, index) =>
                            <StyledSmallText key={index}>{(index ? ', ' : ' ') + genre}</StyledSmallText>
                    )}
                </StyledRegularText>
                <StyledRegularText>Format:
                    {itemDetails.format.map((format, index) =>
                        <StyledSmallText key={index}> {format}</StyledSmallText>
                    )}
                </StyledRegularText>
            </View>
        </StyledCenteredSafeArea>
    );
}

export default Item;