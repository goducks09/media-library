import React, {useState} from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddItem = () => {
    const [format, setFormat] = useState([]);

    function onChangeText() {
        // async fetch from external movie API
    }

    return (
        <>
            <Text>Add New</Text>

            <TextInput
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Picker
                selectedValue={format}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    setFormat({ format: itemValue })
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <TouchableOpacity>
                <Text>Add to Collection</Text>
            </TouchableOpacity>
        </>
    );
}

export default AddItem;