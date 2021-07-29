import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const DataTableRow = props => {
    // props will be name, price and id
    const { data, colNames, style } = props;
    const [checked, setChecked] = useState(false);
    // defaultWidth
    console.log(Object.keys(data), style.defaultWidth)
    return (
        <>

            <View style={styles.rowContainer}>
                {
                    colNames.map((item, index) => {
                        return (
                            <View key={index} style={{ width: style.defaultWidth}}>
                                <Text style={styles.rowCell}>{data[item]}</Text>
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
        // flexDirection: 'row-reverse'
    },
    rowCell: {
        color: 'black',
        textAlign: 'left',
        fontSize: 14.5,
        textAlign: 'center'
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

