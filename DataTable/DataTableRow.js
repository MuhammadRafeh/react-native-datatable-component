import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { COL_TYPES } from './DataTable';

const { width, height } = Dimensions.get('window');

const DataTableRow = props => {
    // props will be name, price and id
    const { data, colNames, style, colNameType } = props;
    const [checked, setChecked] = useState(false);
    // defaultWidth
    console.log(Object.keys(data), style.defaultWidth)
    return (
        <>
    
            <View style={styles.rowContainer}>
                {
                    colNames.map((name, index) => {
                        const colType = colNameType[name] 
                        const textAlign = (colType == COL_TYPES.STRING || colType==null) ? 'left': (colType == COL_TYPES.ICON || colType == COL_TYPES.RADIO) ? 'center': 'right' 
                        let paddingLeft = 0;
                        let paddingRight = 0;
                        if (textAlign == 'left'){
                           paddingLeft = 13     
                        } else if (textAlign == 'right'){
                            paddingRight = 13;
                        }
                        return (
                            <View key={index} style={{ width: style.defaultWidth }}>
                                <Text style={[styles.rowCell, {paddingLeft, paddingRight, textAlign}]}>{data[name]}</Text>
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
        // textAlign: 'left',
        fontSize: 14.5,
        // textAlign: 'center'
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

