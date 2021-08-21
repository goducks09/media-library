import React, {useContext} from 'react';
import { herokuServer, localServer, platform, UserContext } from "../../App";
import ConfirmationBox from "../components/confirmationBox";
import { StyledButtonText, StyledCenteredSafeArea, StyledLoginView, StyledPageHeader, StyledRoundedButtonWide, ToastMessage } from '../config/globalStylesStyled';

const AccountScreen = () => {
    const { logoutUser, userID } = useContext(UserContext);
    
    const server = platform === 'web' ? localServer : herokuServer;
    const deleteAccount = async () => {
        try {
            let response = await fetch(`${server}/delete`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userID
                })
            });
            let json = await response.json();
            if (response.status === 200) logoutUser('deleted');
            ToastMessage(json.message);
            // console.log(json.message);
        } catch (error) {
            ToastMessage(`Sorry there was an error. Please try again.`);
            // console.log(error);
        }
    };

    const handleLogout = () => {
        ConfirmationBox(logoutUser, 'log out');
    };

    const handleDelete = () => {
        ConfirmationBox(deleteAccount, 'delete');
    };

    return (
        <StyledCenteredSafeArea>
            <StyledPageHeader>Account</StyledPageHeader>
            <StyledLoginView>
                <StyledRoundedButtonWide onPress={handleLogout}>
                    <StyledButtonText>Log out of Account</StyledButtonText>
                </StyledRoundedButtonWide>
                <StyledRoundedButtonWide onPress={handleDelete} borderColor={'red'}>
                    <StyledButtonText textColor={'red'}>Delete Account</StyledButtonText>
                </StyledRoundedButtonWide>
            </StyledLoginView>
        </StyledCenteredSafeArea>
    );
};

export default AccountScreen;