import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StyledRowView, StyledButtonText, StyledCenteredView, StyledRegularText, StyledRoundedButton, StyledRoundedButtonWide, StyledStandardSafeArea } from '../config/globalStylesStyled';
import { UserContext } from "../../App";
import ThumbnailItem from '../components/thumbnailItem';


const HomeScreen = ({navigation}) => {
    const { userItems } = useContext(UserContext);
    
    const handleRandomMoviePress = () => {
        //TODO make sure value doesn't duplicate and return same item twice
        const randomIndex = Math.floor(Math.random() * Math.floor(userItems.length));
        const item = userItems[randomIndex];
        navigation.navigate('Item Details', { itemID: item.itemID._id, title: item.itemID.title });
    };
    
    const handleLibraryNavigationPress = type => {
        navigation.navigate('Library', { sortBy: type });
    };
    
    const handleItemPress = item => {
        navigation.navigate('Item Details', { itemID: item.itemID._id, title: item.itemID.title });
    };

    return (
        <StyledStandardSafeArea style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {userItems[0] &&
                    <StyledCenteredView>
                        <StyledRegularText textAlign={'center'}>Recently Added</StyledRegularText>
                        <View style={styles.row}>
                        {userItems.slice(-3).map(item =>
                            <ThumbnailItem item={item} key={item._id} onPress={handleItemPress} />
                        )}    
                        </View>
                    </StyledCenteredView>
                }

                <StyledCenteredView>
                    <StyledRegularText textAlign={'center'}>View By</StyledRegularText>
                    <StyledRowView>
                        <StyledRoundedButton onPress={() => handleLibraryNavigationPress('title')}>
                            <StyledButtonText>Title</StyledButtonText>
                        </StyledRoundedButton>
                        <StyledRoundedButton onPress={() => handleLibraryNavigationPress('genre')}>
                            <StyledButtonText>Genre</StyledButtonText>
                        </StyledRoundedButton>
                        <StyledRoundedButton onPress={() => handleLibraryNavigationPress('actor')}>
                            <StyledButtonText>Actor</StyledButtonText>
                        </StyledRoundedButton>
                        <StyledRoundedButton onPress={() => handleLibraryNavigationPress('pq')}>
                            <StyledButtonText>PQ</StyledButtonText>
                        </StyledRoundedButton>
                        <StyledRoundedButtonWide onPress={handleRandomMoviePress}>
                            <StyledButtonText>Pick random item</StyledButtonText>
                        </StyledRoundedButtonWide>
                    </StyledRowView>
                </StyledCenteredView>
            </ScrollView>
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
    },
    scroll: {
        justifyContent: 'space-around'
    }
});

export default HomeScreen;