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

export const StyledRegularText = styled.Text`
    color: #00C6CF;
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
`;

export const StyledRoundedButton = styled.TouchableOpacity`
    alignItems: center;
    backgroundColor: #151515;
    borderColor: #00C6CF;
    borderRadius: 28px;
    borderWidth: 2px;
    width: 175px;
`;

export const StyledRowView = styled.View`
    flexDirection: row;
    flexWrap: wrap;
    justifyContent: space-around;
    rowGap: 10px;
`;

export const StyledTextInput = styled.TextInput`
    borderColor: #151515;
    color: #00C6CF;
`;

export const StyledCenteredView = styled.View`
    textAlign: center;
`;

export const StyledImage = styled.Image`
    height: 138px;
    width: 92px;
`;