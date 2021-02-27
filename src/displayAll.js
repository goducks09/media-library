import React, {useState} from 'react';
import { Text, TextInput, VirtualizedList } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const DisplayAll = () => {
    const [sortOption, setSortOption] = useState("");
    return (
        <>
            {/* <Text>{sort.type}</Text> */}
            <Text>Heading</Text>
            {sortOption === 'select' ? 
                <Picker
                    selectedValue={sortOption}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setOption({ sortOption: itemValue })
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            
                :
                
                <TextInput
                    onChangeText={console.log('text => onChangeText(text)')}
                    value={console.log('value')}
                />
            }
            <VirtualizedList />
        </>
    );
}

export default DisplayAll;