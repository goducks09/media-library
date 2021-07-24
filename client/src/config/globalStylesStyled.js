// import Toast from 'react-native-root-toast';
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

export const StyledRowView = styled.View`
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    /* rowGap: 10px; */
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
    width: 90%;
`

export const StyledPressable = styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    border: none;
    color: #00C6CF;
    margin: 0 auto 10px;
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
    shadow-color: #00C6CF;
    shadow-offset: { width: 1, height: 2 };
    shadow-opacity: 0.8;
    shadow-radius: 2px;
`;

export const StyledPressableImage = styled.Pressable`
    margin: 5px auto;
`;

export const StyledImage = styled.Image`
    height: 138px;
    width: 92px;
`;

export const StyledPicker = styled.Picker`
    /* appearance: none; */
    background-color: #151515;
    /* to change color of picker arrow, change the value after %23 in the url */
    /* backgroundImage: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300C6CF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat; */
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    /* backgroundPosition: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%; */
    border-color: #00C6CF;
    border-radius: 28px;
    border-style: solid;
    border-width: 1px;
    color: #00C6CF;
    font-size: 18px;
    height: 40px;
    min-height: 40px;
    padding-left: 15px;
    width: 250px;
`;

// export const ToastMessage = message =>
//     Toast.show(message, {
//         backgroundColor: '#00C6CF',
//         duration: Toast.durations.LONG,
//         position: -50
//     });