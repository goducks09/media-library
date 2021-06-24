import React from 'react';
import { Image, View } from 'react-native';
import { StyledRegularText, StyledSmallText, StyledCenteredSafeArea, StyledSectionItem } from './config/globalStylesStyled';

const Item = ({route}) => {
    const { itemDetails } = route.params;
    
    return (
        <StyledCenteredSafeArea>
            <Image
                source={{ uri: `${itemDetails.itemID.imageURL}` }}
                style={{ height: 175, width: 125, resizeMode: 'contain' }}
            />
            <View>
                <StyledRegularText>Starring:</StyledRegularText>
            {/* only get first 5 actors to show */}
                {itemDetails.itemID.actors.slice(0,5).map((actor, index) => 
                    <StyledSectionItem key={index}>{actor.fullName}</StyledSectionItem>
                )}
            {/* If an item is a tv show, it won't have a director, so don't display */}
                {
                    itemDetails.itemID.director[0] &&
                    <StyledRegularText>Director:
                {itemDetails.itemID.director.map((director, index) =>
                        <StyledSmallText key={index}>{(index ? ', ' : ' ') + director.fullName}</StyledSmallText>
                    )}
                    </StyledRegularText>
                }
            {/* If an item is a tv show, it won't have a run time, so don't display */}
                {itemDetails.itemID.runTime && <StyledRegularText>Runtime: <StyledSmallText>{itemDetails.itemID.runTime} min</StyledSmallText></StyledRegularText>}
                <StyledRegularText>Format:
                    {itemDetails.format.map((format, index) =>
                        <StyledSmallText key={index}> {format}</StyledSmallText>
                    )}
                </StyledRegularText>
            </View>
        </StyledCenteredSafeArea>
    );
}

export default Item;