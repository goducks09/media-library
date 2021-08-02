import { Alert } from "react-native";

const ConfirmationBox = (handleConfirm, action) => {
    Alert.alert(
        `Are you sure you want to ${action}?`,
        null,
        [
            { text: "Cancel" },
            { text: "YES", onPress: handleConfirm }
        ],
        { cancelable: false }
    );
};

export default ConfirmationBox;