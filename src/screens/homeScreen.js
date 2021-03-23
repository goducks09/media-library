import React, {useState, useEffect} from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyledRowView, StyledButtonText, StyledCenteredView, StyledRegularText, StyledRoundedButton, StyledImage } from '../config/globalStyles';
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
                    <StyledCenteredView>
                        <StyledRegularText>Recently Added</StyledRegularText>
                        <View style={styles.row}>
                            {movies.map(movie =>
                                <Pressable key={movie.id} onPress={() => navigation.navigate('Movie Details', {movieDetails: movie})}>
                                    <StyledImage
                                        source={{ uri: movie.imageURL }}
                                    />
                                </Pressable>
                            )}    
                        </View>
                    </StyledCenteredView>
                }

                <StyledCenteredView>
                    <StyledRegularText>View By</StyledRegularText>
                    <StyledRowView>
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
                    </StyledRowView>
                </StyledCenteredView>

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