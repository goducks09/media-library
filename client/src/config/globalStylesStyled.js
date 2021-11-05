import Toast from 'react-native-root-toast';
import styled from 'styled-components/native';

export const StyledStandardSafeArea = styled.SafeAreaView`
    background-color: #151515;
    flex: 1;
    padding: 24px;
`;
export const StyledSpacedSafeArea = styled(StyledStandardSafeArea)`
    justify-content: space-around;
`;

export const StyledCenteredSafeArea = styled(StyledStandardSafeArea)`
    align-items: center;
`;

export const StyledFullCenteredView = styled.View`
    height: 100%;
    justify-content: center;
    maxHeight: 100%;
`;

export const StyledShrinkView = styled.View`
    align-items: center;
    flex-shrink: 1;
    justify-content: space-around;
    min-width: 90%;
`;

export const StyledCenteredView = styled.View`
    flex: 1 auto;
    justify-content: center;
    text-align: center;
`;

export const StyledLoginView = styled(StyledCenteredView)`
    align-items: center;
    min-width: 90%;
`;

export const StyledRowView = styled.View`
    align-items: center;
    flex-direction: ${props => props.direction || 'row'};
    flex-wrap: ${props => props.direction ? 'nowrap': 'wrap'};
    justify-content: space-around;
    max-width: 450px;
`;

export const StyledRowViewWide = styled(StyledRowView)`
    max-width: 100%;
`;

export const StyledModalView = styled.View`
    align-items: center;
    flex: 1;
    justify-content: space-around;
    max-height: 525px;
    padding: 10% 0;
`;

export const StyledModalContainer = styled.View`
    background-color: #151515;
    justify-content: center;
    flex: 1;
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
    font-size: 34px;
    font-weight: bold;
    margin-top: 16px;
`;

export const StyledButtonText = styled(StyledRegularText)`
    font-size: 24px;
    text-align: center;
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
    background-color: ${props => props.backgroundColor || '#151515'};
    border-color: ${props => props.borderColor || '#00C6CF'};
    border-radius: 28px;
    border-width: 2px;
    margin: 5px auto;
    padding: 8px 25px;
    width: 155px;
`;

export const StyledRoundedButtonWide = styled(StyledRoundedButton)`
    max-width: 450px;
    min-width: 250px;
    width: 90%;
`

export const StyledPressable = styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    width: 90%;
`;

export const StyledLogin = styled(StyledPressable)`
    align-items: center;
    border: #00C6CF;
    border-radius: 28px;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    min-width: 90%;
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
    align-self: center;
    border: 1px solid #00C6CF;
    border-radius: 28px;
    elevation: 1;
    flex-direction: row;
    shadow-color: #00C6CF;
    shadow-offset: { width: 1, height: 2 };
    shadow-opacity: 0.8;
    shadow-radius: 2px;
    width: 90%;
`;

export const StyledPressableImage = styled.Pressable`
    margin: 5px;
`;

export const StyledImage = styled.Image`
    height: 138px;
    width: 92px;
`;

export const DropdownStyles = {
    iconContainer: { top: 13, right: 12 },
    inputAndroid: {
        color: '#00C6CF', fontSize: 18, paddingVertical: 10, paddingRight: 12, textAlign: 'center'
    },
    inputIOS: {
        color: '#00C6CF', fontSize: 18, paddingVertical: 10, paddingRight: 12, textAlign: 'center'
    }
};

export const StyledPickerContainer = styled.View`
    border: 1px solid #00C6CF;
    border-radius: 10px;
    color: #00C6CF;
    margin: 0 auto;
    width: 67%;
`;

export const StyledImageContainer = styled.View`
    align-self: center;
    margin-bottom: 10px;
    width: 100%;
`;

export const ToastMessage = message =>
    Toast.show(message, {
        backgroundColor: '#E90C59',
        duration: Toast.durations.LONG,
        opacity: 0.9,
        position: -80
    });