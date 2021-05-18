import React, {useContext} from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyledRowView, StyledButtonText, StyledCenteredView, StyledRegularText, StyledRoundedButton, StyledImage, StyledStandardSafeArea } from '../config/globalStyles';
import { UserContext } from "../../App";


const HomeScreen = ({navigation}) => {
    const { userItems } = useContext(UserContext);
    console.log('items: ', userItems);
    
    const handleRandomMoviePress = () => {
        //TODO make sure value doesn't duplicate and return same item twice
        const randomIndex = Math.floor(Math.random() * Math.floor(userItems.length));
        navigation.navigate('Item Details', { itemDetails: userItems[randomIndex] });
    };
    
    const handleNavigationPress = (e) => {
        navigation.navigate('Library', { sortBy: e.target.innerText });
    };

    return (
        <StyledStandardSafeArea>
            <ScrollView contentContainerStyle={styles.container}>
                {userItems &&
                    <StyledCenteredView>
                        <StyledRegularText>Recently Added</StyledRegularText>
                        <View style={styles.row}>
                            {userItems.map(item =>
                                <Pressable key={item._id} onPress={() => navigation.navigate('Item Details', {itemDetails: item})}>
                                    <StyledImage
                                        source={{ uri: item.itemID.imageURL }}
                                    />
                                </Pressable>
                            )}    
                        </View>
                    </StyledCenteredView>
                }
            </ScrollView>

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
                <StyledButtonText>Pick random item</StyledButtonText>
            </StyledRoundedButton>
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