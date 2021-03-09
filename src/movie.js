import React, { useReducer } from 'react';
import { Image, Text } from 'react-native';

const initialState = {
    actors: [], //TODO needs to be an array of obj {firstName, lastName, fullName}
    category: [],
    dateAdded: '',
    director: {},
    format: [], //TODO needs to take input and comma separate (e.g. "4K Blu-ray Physical" => ["4K", "Blu-ray", "Physical"])
    genre: '', //TODO make array for multiple options?
    imageURL: '',
    releaseDate: 0,
    runTime: 0,
    title: '',
}

const reducer = () => {
    console.log('reducer');
}

const Movie = ({route}) => {
    const [movie, setMovie] = useReducer(reducer, initialState);
    const { movieDetails } = route.params;
    return (
        <>
            <Text>{movieDetails.title}</Text>

            <Image
                source={movieDetails.imageURL}
                style={{height: 150, width: 150}}
            />
            
            <Text>Starring:</Text>
            {movieDetails.actors.map((actor, index) => 
                <Text key={index}>{actor.fullName}</Text>
            )}

            <Text>Runtime: {movieDetails.runTime}</Text>
            <Text>Genre: {movieDetails.genre}</Text>
            <Text>Format:
                {movieDetails.format.map(format =>
                    format
                )}
            </Text>
        </>
    );
}

export default Movie;