import React from 'react';
import { Pressable } from "react-native";
import { StyledImage } from "../config/globalStyles";

const ThumbnailItem = props => {
    const { item, onPress } = props;

    return (
        <Pressable onPress={() => onPress(item)}>
            <StyledImage
                source={{ uri: item.itemID.imageURL }}
            />
        </Pressable>
    );
};

export default ThumbnailItem;