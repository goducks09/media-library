import React, {useState} from "react";
import { Modal } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';
import { DropdownStyles, StyledButtonText, StyledImage, StyledModalView, StyledPickerContainer, StyledRoundedButtonWide, StyledSmallText } from "../config/globalStylesStyled";

const ItemModal = props => {
    const { item, mediaType, modalOpen, onSubmit, pictureQuality, type } = props;
    const [media, setMedia] = useState(mediaType);
    const [quality, setQuality] = useState(pictureQuality);
    const submitText = type === 'add' ? 'Add to Collection' : 'Update Item';

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
                <StyledPickerContainer>
                    <RNPickerSelect
                        Icon={() => {
                            return <AntDesign name="caretdown" size={16} color="#00C6CF" />
                        }}
                        items={[
                            { label: 'SD', value: 'SD' },
                            { label: 'HD', value: 'HD' },
                            { label: '4K', value: '4K' },
                        ]}
                        onValueChange={(itemValue) => setQuality(itemValue)}
                        placeholder={{}}
                        style={DropdownStyles}
                        value={quality}
                    />
                </StyledPickerContainer>
                <StyledSmallText>Choose media: </StyledSmallText>
                <StyledPickerContainer>
                    <RNPickerSelect
                        Icon={() => {
                            return <AntDesign name="caretdown" size={16} color="#00C6CF" />
                        }}
                        items={[
                            { label: 'Physical', value: 'Physical' },
                            { label: 'Digital', value: 'Digital' }
                        ]}
                        onValueChange={(itemValue) => setMedia(itemValue)}
                        placeholder={{}}
                        style={DropdownStyles}
                        value={media}
                    />
                </StyledPickerContainer>
        
                <StyledImage source={{ uri: item.imageURL }} />
                <StyledSmallText>
                    {item.title} ({item.releaseDate})
                </StyledSmallText>

                <StyledRoundedButtonWide onPress={handleSubmit} backgroundColor='#00C6CF'>
                    <StyledButtonText textColor='#151515'>{submitText}</StyledButtonText>
                </StyledRoundedButtonWide>
                <StyledSmallText onPress={handleModal}>Back</StyledSmallText>
            </StyledModalView>
        </Modal>
    )
};

export default ItemModal;