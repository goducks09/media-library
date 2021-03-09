import styled from 'styled-components/native';

export const StyledStandardSafeArea = styled.SafeAreaView`
    background-color: #151515;
    flex: 1;
    justify-content: 'space-around';
    padding: 16px;
`;

export const StyledRegularText = styled.Text`
    color: #00C6CF;
    font-size: 32px;
`;

export const StyledSmallText = styled(StyledRegularText)`
    font-size: 20px;
`;

export const StyledButtonText = styled(StyledRegularText)`
    font-size: 28px;
`;

export const StyledSectionHeading = styled(StyledRegularText)`
    font-size: 28px;
    margin-top: 20px;
`;

export const StyledRoundedButton = styled.TouchableOpacity`
    alignItems: center;
    backgroundColor: #151515;
    borderColor: #00C6CF;
    borderRadius: 28px;
    borderWidth: 2px;
    width: 175px;
`;

export const StyledButtonGroup = styled.View`
    flexDirection: row;
    flexWrap: wrap;
    justifyContent: space-around;
    rowGap: 10px;
`;