// import Toast from 'react-native-root-toast';
import { AuthError } from 'expo-auth-session';
import styled from 'styled-components/native';

export const StyledStandardSafeArea = styled.SafeAreaView`
    background-color: #151515;
    flex: 1;
    padding: 16px;
`;
export const StyledSpacedSafeArea = styled(StyledStandardSafeArea)`
    justify-content: space-around;
`;

export const StyledCenteredSafeArea = styled(StyledStandardSafeArea)`
    align-items: center;
`;

export const StyledView = styled.View`
    width: 75%;
`;

export const StyledCenteredView = styled.View`
    flex: 1 auto;
    justify-content: space-around;
    text-align: center;
`;

export const StyledLoginView = styled(StyledCenteredView)`
    align-items: center;
    justify-content: center;
    width: 90%;
`;

export const StyledRowView = styled.View`
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 450px;
`;

export const StyledRowViewWide = styled(StyledRowView)`
    max-width: 100%;
`;

export const StyledModalView = styled.View`
    align-items: center;
    background-color: #151515;
    flex: 1;
    justify-content: space-around;
    padding: 30% 0;
`;

export const StyledRegularText = styled.Text`
    color: ${props => props.textColor || '#00C6CF'};
    font-size: 24px;
    text-align: ${props => props.textAlign || 'auto'};
`;

export const StyledSmallText = styled(StyledRegularText)`
    flex-shrink: 1;
    font-size: 18px;
`;

export const StyledPageHeader = styled(StyledRegularText)`
    font-size: 32px;
`;

export const StyledButtonText = styled(StyledRegularText)`
    font-size: 24px;
`;

export const StyledSectionList = {
    alignItems: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto'
};

export const StyledSectionHeading = styled(StyledRegularText)`
    font-size: 28px;
    margin-top: 20px;
`;

export const StyledSectionItem = styled(StyledRegularText)`
    font-size: 18px;
    margin-left: 10px;
    padding-left: 10px;
`;

export const StyledRoundedButton = styled.TouchableOpacity`
    align-items: center;
    background-color: ${props => props.backgroundColor || '#151515'}
    border-color: #00C6CF;
    border-radius: 28px;
    border-width: 2px;
    margin: 5px auto;
    padding: 8px 25px;
    width: 155px;
`;

export const StyledRoundedButtonWide = styled(StyledRoundedButton)`
    max-width: 450px;
    width: 90%;
`

export const StyledPressable = styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    width: 90%;
`;

export const StyledLogin = styled(StyledPressable)`
    border: #00C6CF;
    border-radius: 28px;
    justify-content: center;
    margin-bottom: 20px;
`;

export const StyledTextInput = styled.TextInput`
    border: none;
    color: #00C6CF;
    padding: 5px;
    width: 90%;

    &:focus,
    &:focus-visible,
    &:focus-within {
        outline: none;
    }
`;

export const StyledTextInputContainer = styled.View`
    border: 1px solid #00C6CF;
    border-radius: 28px;
    elevation: 1;
    flex-direction: row;
    shadow-color: #00C6CF;
    shadow-offset: { width: 1, height: 2 };
    shadow-opacity: 0.8;
    shadow-radius: 2px;
`;

export const StyledPressableImage = styled.Pressable`
    margin: 5px;
`;

export const StyledImage = styled.Image`
    height: 138px;
    width: 92px;
`;

export const StyledPicker = styled.Picker`
    color: #00C6CF;
    font-size: 18px;
    height: 40px;
    min-height: 40px;
    padding-left: 15px;
    width: 100%;
`;

export const StyledPickerContainer = styled.View`
    border: 1px solid #00C6CF;
    border-radius: 10px;
    color: #00C6CF;
    margin: 0 auto;
    width: 67%;
`;

// export const ToastMessage = message =>
//     Toast.show(message, {
//         backgroundColor: '#00C6CF',
//         duration: Toast.durations.LONG,
//         position: -50
//     });