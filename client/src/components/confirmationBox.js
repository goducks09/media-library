import React from 'react';
import { Alert, Button, View } from "react-native";

const ConfirmationBox = handleConfirm => {
    Alert.alert(
        "Are you sure?",
        "message",
        [
            { text: "Cancel" },
            { text: "YES", onPress: handleConfirm }
        ],
        { cancelable: false }
    );
};

export default ConfirmationBox;