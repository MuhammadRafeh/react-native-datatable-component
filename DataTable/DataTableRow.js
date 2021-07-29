import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const DataTableRow = props => {
    // props will be name, price and id
    const { data, colNames, styles } = props;
    const [checked, setChecked] = useState(false);
    // defaultWidth
    return (
        <>

            <View style={styles.rowContainer}>
                {
                    Object.keys(data).map((item, index) => {
                        return (
                            <View key={index} style={{ width: styles.defaultWidth }}>
                                <Text style={{ color: 'grey', fontSize: 12, textAlign: 'center' }}>{colName}</Text>
                            </View>
                        );
                    })
                }
            </View>


            <View style={styles.line} />
        </>
    );
}

export default DataTableRow;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row'
    },
    line: {
        height: 1,
        backgroundColor: '#e3e3e3',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        width
    }
});

