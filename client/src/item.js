import React, {useContext, useEffect, useState} from 'react';
import { Image, Pressable, View } from 'react-native';
import { herokuServer, localServer, platform, UserContext } from "../App";
import ItemModal from './components/modal';
import ConfirmationBox from "./components/confirmationBox";
import { StyledButtonText, StyledRegularText, StyledRoundedButton, StyledRowView, StyledSmallText, StyledCenteredSafeArea, StyledSectionItem, StyledView, ToastMessage } from './config/globalStylesStyled';

const Item = ({ route }) => {
    const {removeUserItem, userID, userItems, updateItemList} = useContext(UserContext);
    const { itemID } = route.params;
    const [item, setItem] = useState(null);
    const [editing, setEditing] = useState(false);
    const server = platform === 'web' ? localServer : herokuServer;

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
            // ToastMessage(json.message);
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
            // ToastMessage(json.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleDelete = () => {
        ConfirmationBox(deleteItem);
    };
    
    return (
        <StyledCenteredSafeArea>
            {item &&
                <>
                    <Image
                        source={{ uri: `${item.itemID.imageURL}` }}
                        style={{ height: 175, width: 125, resizeMode: 'contain' }}
                    />
                    <StyledView>
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

                        <StyledRowView>
                            <Pressable onPress={handleEdit}>
                                <Image
                                    source={require('../assets/edit-24.png')}
                                    fadeDuration={0}
                                    style={{ height: 24, margin: 5, width: 24 }}
                                />
                            </Pressable>
                            <Pressable onPress={handleDelete}>
                                <Image
                                    source={require('../assets/delete-24.png')}
                                    fadeDuration={0}
                                    style={{ height: 24, margin: 5, width: 24 }}
                                />
                            </Pressable>
                        </StyledRowView>
                    </StyledView>
                </>
            }
            {
                editing &&
                <ItemModal
                    item={item.itemID}
                    mediaType={item.mediaType}
                    modalOpen={setEditing}
                    onSubmit={updateItem}
                    pictureQuality={item.pictureQuality}
                />
            }
            </StyledCenteredSafeArea>
    );
}

export default Item;