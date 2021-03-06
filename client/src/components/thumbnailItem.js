import React from 'react';
import { StyledImage, StyledPressableImage } from "../config/globalStylesStyled";

const ThumbnailItem = props => {
    const { item, onPress } = props;

    return (
        <StyledPressableImage onPress={() => onPress(item)}>
            <StyledImage
                source={{ uri: item.itemID.imageURL }}
            />
        </StyledPressableImage>
    );
};

export default ThumbnailItem;