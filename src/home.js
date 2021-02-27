import React, {useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Movie from './movie';

const Home = () => {
    const [movies, setMovies] = useState(true);

    return (
        <>
            <Text>Movie Library</Text>
            {movies &&
                <>
                    <Text>Recently Added</Text>
                    <Movie />
                </>
            }

            <Text>View By</Text>
            <TouchableOpacity>
                <Text>Title</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Genre</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Actor</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Format</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Pick random movie</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    }
});

export default Home;