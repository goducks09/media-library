import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    styledSafeAreaView: {
        backgroundColor: '#151515',
        flex: 1,
        padding: 16
    },
    styledSpacedSafeAreaView: {
        justifyContent: 'space-around'  
    },
    styledCenteredSafeAreaView: {
        alignItems: 'center'
    },
    styledCenteredView: {
        flex: 1,
        flexBasis: 'auto',
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    styledRowView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'   
    },
    styledModalView: {
        alignItems: 'center',
        backgroundColor: '#151515',
        flex: 1,
        justifyContent: 'space-around',
        paddingVertical: '30%'
    },
    styledRegularText: {
        // color: `${props => props.textColor || '#00C6CF'}`,
        fontSize: 32
    },
    styledSmallText: {
        fontSize: 20
    },
    styledPageHeader: {
        fontSize: 48
    },
    styledButtonText: {
        fontSize: 28
    },
    styledSectionList: {
        alignItems: 'flex-start',
    },
    styledSectionHeading: {
        fontSize: 28,
        marginTop: 20
    },
    styledSectionItem: {
        fontSize: 20,
        marginLeft: 10,
        paddingLeft: 10,
        /* textIndent: -10px; */
    },
    styledRoundedButton: {
        alignItems: 'center',
        // backgroundColor: `${props => props.backgroundColor || '#151515'}`,
        borderColor: '#00C6CF',
        borderRadius: 28,
        borderWidth: 2,
        paddingHorizontal: 45,
        paddingVertical: 10,
        width: 175
    },
    styledRoundedButtonWide: {
        marginHorizontal: 'auto',
        marginVertical: 0,
        width: '90%'
    },
    styledPressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        width: '85%'
    },
    styledTextInput: {
        borderColor: '#00C6CF',
        borderRadius: 28,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: '#00C6CF',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        color: '#00C6CF',
        padding: 5
    },
    styledImage: {
        height: 138,
        width: 92
    },
    styledPicker: {
        /* appearance: none; */
        backgroundColor: '#151515',
        /* to change color of picker arrow, change the value after %23 in the url */
        /* backgroundImage: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300C6CF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        backgroundRepeat: no-repeat, repeat; */
        /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
        /* backgroundPosition: right .7em top 50%, 0 0;
        backgroundSize: .65em auto, 100%; */
        borderColor: '#00C6CF',
        borderRadius: 28,
        borderStyle: 'solid',
        borderWidth: 1,
        color: '#00C6CF',
        fontSize: 20,
        height: 40,
        minHeight: 40,
        paddingLeft: 15,
        width: 250
    }
});