import React, {useContext} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StyledButtonText, StyledCenteredSafeArea, StyledCenteredView, StyledLoginView, StyledRegularText, StyledRoundedButton, StyledRoundedButtonWide, StyledRowView } from '../config/globalStylesStyled';
import { UserContext } from "../../App";
import ThumbnailItem from '../components/thumbnailItem';


const HomeScreen = ({navigation}) => {
    const { deviceDimensions, userItems } = useContext(UserContext);
    
    const handleRandomMoviePress = () => {
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
        <StyledCenteredSafeArea>
            <ScrollView contentContainerStyle={styles.scroll}>
                {userItems[0] ?
                    <>
                        <StyledCenteredView>
                            <StyledRegularText textAlign={'center'} style={{marginBottom: 15}}>Recently Added</StyledRegularText>
                            <StyledRowView>
                                {userItems.slice(-3).map(item =>
                                    <ThumbnailItem item={item} key={item._id} onPress={handleItemPress} />
                                )}  
                            </StyledRowView>
                        </StyledCenteredView>

                        <StyledCenteredView>
                            <StyledRegularText textAlign={'center'} style={{marginBottom: 15}}>View By</StyledRegularText>
                            <StyledRowView direction={deviceDimensions.height > 700 ? 'column' : null}>
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
                    </>
                    :
                    <StyledLoginView>
                        <StyledRegularText textAlign={'center'}>Looks like you need to add some items!</StyledRegularText>
                    </StyledLoginView>
                }
            </ScrollView>
        </StyledCenteredSafeArea>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: 'space-around'
    }
});

export default HomeScreen;