import React, {useContext, useEffect, useState} from 'react';
import { Image, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { devServer, herokuServer, localServer, platform, UserContext } from "../../App";
import ItemModal from '../components/modal';
import ConfirmationBox from "../components/confirmationBox";
import { StyledCenteredSafeArea, StyledFullCenteredView, StyledImageContainer, StyledRegularText, StyledRowView, StyledSectionItem, StyledShrinkView, StyledSmallText, ToastMessage } from '../config/globalStylesStyled';
import { ScrollView } from 'react-native-gesture-handler';

const Item = ({ navigation, route }) => {
    const {deviceDimensions, removeUserItem, userID, userItems, updateItemList} = useContext(UserContext);
    const { itemID } = route.params;
    const [item, setItem] = useState(null);
    const [editing, setEditing] = useState(false);
    const server = platform === 'web' ? localServer : herokuServer;
    let height = 138;
    let width = 92;
    if (deviceDimensions.height > 700) {
        height = 220;
        width = 184;
    }

    useEffect(() => {
        getItem();
    }, [itemID, userItems]);

    const getItem = () => {
        const item = userItems.find(obj => {
            return obj.itemID._id === itemID;
        });
        setItem(item);
    };

    const updateItem = async (quality, media) => {
        try {
            let response = await fetch(`${server}/items/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    media,
                    quality,
                    userID
                })
            });
            let json = await response.json();
            updateItemList(json.updatedItem, true);
            ToastMessage(json.message);
            // console.log(json.message);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async () => {
        try {
            let response = await fetch(`${server}/items/${item._id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID
                })
            });
            let json = await response.json();
            if (response.ok) removeUserItem(item._id);
            navigation.dispatch(CommonActions.goBack());
            ToastMessage(json.message);
            // console.log(json.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleDelete = () => {
        ConfirmationBox(deleteItem, 'delete');
    };
    
    return (
        <StyledCenteredSafeArea>
            {item &&
                <StyledFullCenteredView>
                    <StyledImageContainer>
                        <Image
                            source={{ uri: `${item.itemID.imageURL}` }}
                            style={{ alignSelf: 'center', height: height, resizeMode: 'contain', width: width }}
                        />
                    </StyledImageContainer>
                    <StyledShrinkView>
                        <ScrollView persistentScrollbar indicatorStyle='white' style={{flexGrow: 0}} >
                            <StyledRegularText>Starring:</StyledRegularText>
                            {/* only get first 5 actors to show */}
                            {item.itemID.actors.slice(0, 5).map((actor, index) =>
                                <StyledSectionItem key={index}>{actor.fullName}</StyledSectionItem>
                            )}
                            {/* If an item is a tv show, it won't have a director, so don't display */}
                            {
                                item.itemID.director[0] &&
                                <StyledRegularText>Director:
                                    {item.itemID.director.map((director, index) =>
                                        <StyledSmallText key={index}>{(index ? ', ' : ' ') + director.fullName}</StyledSmallText>
                                    )}
                                </StyledRegularText>
                            }
                            {/* If an item is a tv show, it won't have a run time, so don't display */}
                            {item.itemID.runTime && <StyledRegularText>Runtime: <StyledSmallText>{item.itemID.runTime} min</StyledSmallText></StyledRegularText>}
                            <StyledRegularText>Quality:
                                <StyledSmallText> {item.pictureQuality}</StyledSmallText>
                            </StyledRegularText>
                            <StyledRegularText>Media:
                                <StyledSmallText> {item.mediaType}</StyledSmallText>
                            </StyledRegularText>
                        </ScrollView>
                    </StyledShrinkView>
                    <StyledRowView>
                        <Pressable onPress={handleEdit}>
                            <Image
                                source={require('../../assets/edit-24.png')}
                                fadeDuration={0}
                                style={{ height: 24, marginHorizontal: 5, marginVertical: 20, width: 24 }}
                            />
                        </Pressable>
                        <Pressable onPress={handleDelete}>
                            <Image
                                source={require('../../assets/delete-24.png')}
                                fadeDuration={0}
                                style={{ height: 24, marginHorizontal: 5, marginVertical: 20, width: 24 }}
                            />
                        </Pressable>
                    </StyledRowView>
                </StyledFullCenteredView>
            }
            {
                editing &&
                <ItemModal
                    item={item.itemID}
                    mediaType={item.mediaType}
                    modalOpen={setEditing}
                    onSubmit={updateItem}
                    pictureQuality={item.pictureQuality}
                    type={'update'}
                />
            }
            </StyledCenteredSafeArea>
    );
}

export default Item;