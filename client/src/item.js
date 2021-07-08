import React, {useContext, useEffect, useState} from 'react';
import { Image, Pressable, View } from 'react-native';
import { UserContext } from "../App";
import ItemModal from './components/modal';
import { StyledButtonText, StyledRegularText, StyledRoundedButton, StyledRowView, StyledSmallText, StyledCenteredSafeArea, StyledSectionItem } from './config/globalStylesStyled';

const Item = ({ route }) => {
    const {userID, userItems, updateItemList} = useContext(UserContext);
    const { itemID } = route.params;
    const [item, setItem] = useState(null);
    const [editing, setEditing] = useState(false);
    const [pictureQuality, setPictureQuality] = useState(null);
    const [mediaType, setMediaType] = useState(null);

    useEffect(() => {
        getItem();
    }, [itemID, userItems]);

    const getItem = () => {
        const item = userItems.find(obj => {
            return obj.itemID._id === itemID;
        });
        setItem(item);
    };

    const fetchTest = async (quality, media) => {
        try {
            let response = await fetch(`http://localhost:3000/items/${item._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
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
        } catch (error) {
            console.error(error);
        }
    };

    const editItem = () => {
        setEditing(!editing);
    }

    const deleteItem = () => {
        console.log("delete item");
    }
    
    return (
        <StyledCenteredSafeArea>
            {item &&
                <>
                    <Image
                        source={{ uri: `${item.itemID.imageURL}` }}
                        style={{ height: 175, width: 125, resizeMode: 'contain' }}
                    />
                    <View>
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
                        <StyledRowView>
                            <StyledRegularText>Quality:
                                <StyledSmallText> {item.pictureQuality}</StyledSmallText>
                            </StyledRegularText>
                            <StyledRegularText>Media:
                                <StyledSmallText> {item.mediaType}</StyledSmallText>
                            </StyledRegularText>
                            <Pressable onPress={editItem}>
                                <Image
                                    source={require('../assets/edit-24.png')}
                                    fadeDuration={0}
                                    style={{ width: 18, height: 18 }}
                                />
                            </Pressable>
                        </StyledRowView>

                        <StyledRoundedButton onPress={deleteItem}>
                            <StyledButtonText>Delete</StyledButtonText>
                        </StyledRoundedButton>
                    </View>
                </>
            }
            {/* TODO fix modal updating state even when back is clicked */}
            {
                editing &&
                <ItemModal
                item={item.itemID}
                mediaType={item.mediaType}
                modalOpen={setEditing}
                onSubmit={fetchTest}
                pictureQuality={item.pictureQuality}
                setMediaType={setMediaType}
                setPictureQuality={setPictureQuality}
                />
            }
            </StyledCenteredSafeArea>
    );
}

export default Item;