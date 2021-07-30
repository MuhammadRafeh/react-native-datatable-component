import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { COL_TYPES } from './DataTable';

const { width, height } = Dimensions.get('window');

const DataTableRow = props => {
    // props will be name, price and id
    const { data, colNames, style, colNameType, widthOfLine } = props;
    const [checked, setChecked] = useState(false);
    // defaultWidth
    console.log(Object.keys(data), style.defaultWidth)
    return (
        <>

            <View style={styles.rowContainer}>
                {
                    colNames.map((name, index) => {
                        const colType = colNameType[name]
                        const textAlign = (colType == COL_TYPES.STRING || colType == null) ? 'left' : (colType == COL_TYPES.ICON || colType == COL_TYPES.RADIO) ? 'center' : 'right'
                        let paddingLeft = 0;
                        let paddingRight = 0;
                        if (textAlign == 'left') {
                            paddingRight = 1;
                            paddingLeft = 13
                        } else if (textAlign == 'right') {
                            paddingRight = 13;
                            paddingLeft = 1;

                        }
                        return (
                            <View key={index} style={[styles.rowCellContainer, { width: style.defaultWidth }]}>
                                <Text style={[styles.rowCellText, { paddingLeft, paddingRight, textAlign }]}>{data[name]}</Text>
                            </View>
                        );
                    })
                }
            </View>


            <View style={[styles.line, {width: widthOfLine}]} />
        </>
    );
}

export default DataTableRow;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    rowCellText: {
        color: 'black',
        fontSize: 14.5,
        // backgroundColor: 'green',
        
    },
    rowCellContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: 'green',
    },
    line: {
        height: 1,
        backgroundColor: '#e3e3e3',
        alignSelf: 'center',
        width
    }
});

