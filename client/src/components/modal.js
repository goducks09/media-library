import React, {useEffect, useState} from "react";
import { Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { StyledButtonText, StyledImage, StyledModalView, StyledPicker, StyledRoundedButtonWide, StyledSmallText } from "../config/globalStylesStyled";

const ItemModal = props => {
    const { item, mediaType, modalOpen, onSubmit, pictureQuality } = props;
    const [media, setMedia] = useState(mediaType);
    const [quality, setQuality] = useState(pictureQuality);

    const handleModal = () => {
        modalOpen(false);
    };

    const handleSubmit = () => {
        onSubmit(quality, media);
        handleModal();
    };

    return (
        <Modal
            animationType="fade"
            visible={true}
        >
            <StyledModalView>
                <StyledSmallText>Choose quality: </StyledSmallText>
                <StyledPicker
                    selectedValue={quality}
                    onValueChange={(itemValue) => setQuality(itemValue)}
                >
                    <Picker.Item label="SD" value="SD" />
                    <Picker.Item label="HD" value="HD" />
                    <Picker.Item label="4K" value="4K" />
                </StyledPicker>
                <StyledSmallText>Choose media: </StyledSmallText>
                <StyledPicker
                    selectedValue={media}
                    onValueChange={(itemValue) => setMedia(itemValue)}
                >
                    <Picker.Item label="Physical" value="Physical" />
                    <Picker.Item label="Digital" value="Digital" />
                </StyledPicker>
        
                <StyledImage source={{ uri: item.imageURL }} />
                <StyledSmallText>
                    {item.title} ({item.releaseDate})
                </StyledSmallText>

                <StyledRoundedButtonWide onPress={handleSubmit} backgroundColor='#00C6CF'>
                    <StyledButtonText textColor='#151515'>{ onSubmit.name === 'handleSubmit' ? 'Add to Collection' : 'Update Item' }</StyledButtonText>
                </StyledRoundedButtonWide>
                <StyledSmallText onPress={handleModal}>Back</StyledSmallText>
            </StyledModalView>
        </Modal>
    )
};

export default ItemModal;