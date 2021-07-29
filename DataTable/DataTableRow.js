import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const DataTableRow = props => {
    // props will be name, price and id
    const { data, getRowSelectedData } = props;
    const [checked, setChecked] = useState(false);

    return (
        <>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 15 }} numberOfLines={1}>{data.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginRight: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: 'black', textAlign: 'right', fontSize: 14.5 }} numberOfLines={1}>{data.price}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        {/* <Text style={{ color: 'black', textAlign: 'right', paddingLeft: 15, fontSize: 14.5 }} numberOfLines={1}>seasdasdasdlect</Text> */}
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                if (!checked) { //here !checked because to take step according to next state
                                    getRowSelectedData({ ...data, checked: true });
                                    setChecked(!checked);
                                    return
                                }
                                getRowSelectedData({ ...data, checked: false })
                                setChecked(!checked);
                            }}
                        />
                    </View>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: '#e3e3e3', marginTop: 10, marginBottom: 10 }} />

        </>
    );
}

export default DataTableRow;
