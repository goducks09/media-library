import React, {useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyledRowView, StyledButtonText, StyledCenteredView, StyledRegularText, StyledRoundedButton, StyledRoundedButtonWide, StyledStandardSafeArea } from '../config/globalStyles';
import { UserContext } from "../../App";
import ThumbnailItem from '../components/thumbnailItem';


const HomeScreen = ({navigation}) => {
    const { userItems } = useContext(UserContext);
    
    const handleRandomMoviePress = () => {
        //TODO make sure value doesn't duplicate and return same item twice
        const randomIndex = Math.floor(Math.random() * Math.floor(userItems.length));
        navigation.navigate('Item Details', { itemDetails: userItems[randomIndex] });
    };
    
    const handleLibraryNavigationPress = (e) => {
        navigation.navigate('Library', { sortBy: e.target.innerText });
    };
    
    const handleItemPress = item => {
        navigation.navigate('Item Details', { itemDetails: item });
    };

    return (
        <StyledStandardSafeArea>
            <ScrollView contentContainerStyle={styles.container}>
                {userItems &&
                    <StyledCenteredView>
                        <StyledRegularText>Recently Added</StyledRegularText>
                        <View style={styles.row}>
                        {userItems.slice(0,3).map(item =>
                            <ThumbnailItem item={item} key={item._id} onPress={handleItemPress} />
                        )}    
                        </View>
                    </StyledCenteredView>
                }
            </ScrollView>

            <StyledCenteredView>
                <StyledRegularText>View By</StyledRegularText>
                <StyledRowView>
                    <StyledRoundedButton onPress={handleLibraryNavigationPress}>
                        <StyledButtonText>Title</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton onPress={handleLibraryNavigationPress}>
                        <StyledButtonText>Genre</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton>
                        <StyledButtonText onPress={handleLibraryNavigationPress}>Actor</StyledButtonText>
                    </StyledRoundedButton>
                    <StyledRoundedButton>
                        <StyledButtonText onPress={handleLibraryNavigationPress}>Format</StyledButtonText>
                    </StyledRoundedButton>
                </StyledRowView>
                <StyledRoundedButtonWide onPress={handleRandomMoviePress}>
                    <StyledButtonText>Pick random item</StyledButtonText>
                </StyledRoundedButtonWide>
            </StyledCenteredView>

        </StyledStandardSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#151515',
        flex: 1,
        padding: 16,
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default HomeScreen;