import React, { useReducer } from 'react';
import { Image, Text } from 'react-native';

const initialState = {
    actors: [], //TODO needs to be an array of obj {firstName, lastName, fullName}
    category: [],
    dateAdded: '',
    format: [], //TODO needs to take input and comma separate (e.g. "4K Blu-ray Physical" => ["4K", "Blu-ray", "Physical"])
    genre: '', //TODO make array for multiple options?
    imageURL: '',
    releaseDate: 0,
    runTime: 0,
    title: 'Title',
}

const reducer = () => {
    console.log('reducer');
}

const Movie = () => {
    const [movie, setMovie] = useReducer(reducer, initialState);

    return (
        <>
            <Text>{movie.title}</Text>

            <Image
                source={movie.imageURL}
            />
            
            <Text>Starring:</Text>
            {movie.actors.map(actor => 
                <Text>{actor.fullName}</Text>
            )}

            <Text>Runtime: {movie.runTime}</Text>
            <Text>Genre: {movie.genre}</Text>
            <Text>Format:
                {movie.format.map(format =>
                    format
                )}
            </Text>
        </>
    );
}

export default Movie;