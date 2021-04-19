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

const Movie = ({route}) => {
    const [movie, setMovie] = useReducer(reducer, initialState);
    const { movieDetails } = route.params;
    return (
        <StyledCenteredSafeArea>
            <Image
                source={movieDetails.imageURL}
                style={{ height: 268, width: 182, resizeMode: 'contain' }}
            />
            <View>
                <StyledRegularText>Starring:</StyledRegularText>
                {movieDetails.actors.map((actor, index) => 
                    <StyledSectionItem key={index}>{actor.fullName}</StyledSectionItem>
                )}

                {runTime && <StyledRegularText>Runtime: <StyledSmallText>{movieDetails.runTime} min</StyledSmallText></StyledRegularText>}
                <StyledRegularText>Genre:
                        {movieDetails.genre.map((genre, index) =>
                            <StyledSmallText key={index}> {genre},</StyledSmallText>
                    )}
                </StyledRegularText>
                <StyledRegularText>Format:
                    {movieDetails.format.map((format, index) =>
                        <StyledSmallText key={index}> {format}</StyledSmallText>
                    )}
                </StyledRegularText>
            </View>
        </StyledCenteredSafeArea>
    );
}

export default Movie;