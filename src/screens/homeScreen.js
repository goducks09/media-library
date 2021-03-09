import React, {useState, useEffect} from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyledButtonGroup, StyledButtonText, StyledRegularText, StyledRoundedButton } from '../config/globalStyles';
import seedMovies from '../../movieData';

const newMovies = seedMovies.movies;

const HomeScreen = ({navigation}) => {
    const [movies, setMovies] = useState(null);

    const handleRandomMoviePress = () => {
        //TODO make sure value doesn't duplicate
        const randomIndex = Math.floor(Math.random() * Math.floor(movies.length));
        navigation.navigate('Movie Details', { movieDetails: movies[randomIndex] });
    };

    const handleNavigationPress = (e) => {
        navigation.navigate('Library', { sortBy: e.target.innerText });
    };

    useEffect(() => { 
        setMovies(newMovies);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                {movies &&
                    <>
                        <StyledRegularText>Recently Added</StyledRegularText>
                        <View style={styles.row}>
                            {movies.map(movie =>
                                <Pressable key={movie.id} onPress={() => navigation.navigate('Movie Details', {movieDetails: movie})}>
                                    <Image 
                                        style={{height: 75, width: 50}}
                                        source={{ uri: movie.imageURL }}
                                    />
                                </Pressable>
                            )}    
                        </View>
                    </>
                }

                <StyledRegularText>View By</StyledRegularText>
                <StyledButtonGroup>
                    <StyledRoundedButton onPress={handleNavigationPress}>
                        <StyledButtonText>Title</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton onPress={handleNavigationPress}>
                        <StyledButtonText>Genre</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton>
                        <StyledButtonText onPress={handleNavigationPress}>Actor</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton>
                        <StyledButtonText onPress={handleNavigationPress}>Format</StyledButtonText>
                    </StyledRoundedButton>
                </StyledButtonGroup>

                <StyledRoundedButton onPress={handleRandomMoviePress}>
                    <StyledButtonText>Pick random movie</StyledButtonText>
                </StyledRoundedButton>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#151515',
        flex: 1,
        justifyContent: 'space-around',
        padding: 16,
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default HomeScreen;