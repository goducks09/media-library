import styled from 'styled-components/native';

export const StyledStandardSafeArea = styled.SafeAreaView`
    backgroundColor: #151515;
    flex: 1;
    padding: 16px;
`;
export const StyledSpacedSafeArea = styled(StyledStandardSafeArea)`
    justifyContent: space-around;
`;

export const StyledCenteredSafeArea = styled(StyledStandardSafeArea)`
    alignItems: center;
`;

export const StyledCenteredView = styled.View`
    flex: 1 auto;
    justify-content: space-between;
    textAlign: center;
`;

export const StyledRowView = styled.View`
    flexDirection: row;
    flexWrap: wrap;
    justifyContent: space-around;
    rowGap: 10px;
`;

export const StyledModalView = styled.View`
    alignItems: center;
    backgroundColor: #151515;
    flex: 1;
    justifyContent: space-around;
    padding: 30% 0;
`;

export const StyledRegularText = styled.Text`
    color: ${props => props.textColor || '#00C6CF'};
    fontSize: 32px;
`;

export const StyledSmallText = styled(StyledRegularText)`
    fontSize: 20px;
`;

export const StyledPageHeader = styled(StyledRegularText)`
    fontSize: 48px;
`;

export const StyledButtonText = styled(StyledRegularText)`
    fontSize: 28px;
`;

export const StyledSectionList = {
    alignItems: 'flex-start',
};

export const StyledSectionHeading = styled(StyledRegularText)`
    fontSize: 28px;
    marginTop: 20px;
`;

export const StyledSectionItem = styled(StyledRegularText)`
    fontSize: 20px;
    marginLeft: 10px;
    paddingLeft: 10px;
    textIndent: -10px;
`;

export const StyledRoundedButton = styled.TouchableOpacity`
    alignItems: center;
    backgroundColor: ${props => props.backgroundColor || '#151515'}
    borderColor: #00C6CF;
    borderRadius: 28px;
    borderWidth: 2px;
    padding: 10px 45px;
    width: 175px;
`;

export const StyledRoundedButtonWide = styled(StyledRoundedButton)`
    margin: 0 auto;
    width: 90%;
`

export const StyledPressable = styled.Pressable`
    flexDirection: row;
    justifyContent: space-between;
    padding: 15px;
    width: 85%;
`;

export const StyledTextInput = styled.TextInput`
    borderColor: #151515;
    color: #00C6CF;
`;

export const StyledImage = styled.Image`
    height: 138px;
    width: 92px;
`;

export const StyledPicker = styled.Picker`
    appearance: none;
    backgroundColor: #151515;
    /* to change color of picker arrow, change the value after %23 in the url */
    backgroundImage: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300C6CF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    backgroundRepeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    backgroundPosition: right .7em top 50%, 0 0;
    backgroundSize: .65em auto, 100%;
    border: 1px solid #00C6CF;
    borderRadius: 28px;
    color: #00C6CF;
    elevation: 5;
    fontSize: 20px;
    height: 40;
    minHeight: 40;
    paddingLeft: 15;
    shadowColor: #FFFF00,
    shadowOffset: {
        width: 5,
        height: 10,
    };
    shadowOpacity: 0.5;
    shadowRadius: 5;
    width: 250;
`;