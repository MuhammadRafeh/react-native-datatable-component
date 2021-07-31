import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COL_TYPES } from './DataTable';

// import { PADDING_TOP } from './DataTable';
const PADDING_TOP = 20;

const DataTableHeader = props => {

    const {colNames, mapColNameToType, defaultEachColumnWidth, handleColPress} = props;
    
    return (
        <View style={styles.headerContainer}>
            {
                colNames.map((colName, index) => {
                    const colType = mapColNameToType[colName]
                    const justifyContent = (colType == COL_TYPES.STRING || colType == null) ? 'flex-start' : (colType == COL_TYPES.ICON || colType == COL_TYPES.RADIO) ? 'center' : 'flex-end'
                    let paddingLeft = 0;
                    let paddingRight = 0;
                    if (justifyContent == 'flex-start') {
                        paddingLeft = 13
                        paddingRight = 1;
                    } else if (justifyContent == 'flex-end') {
                        paddingRight = 13;
                        paddingLeft = 1
                    }
                    return (
                        <TouchableOpacity key={index} style={[styles.headerRow, { width: defaultEachColumnWidth, justifyContent }]} onPress={handleColPress.bind(null, colName)}>
                            <View style={{ paddingLeft }}>
                                <Image source={require('../assets/doubleArrow.png')} />
                            </View>
                            <View style={{}}>
                                <Text
                                    style={[styles.headerLabel, {
                                        paddingRight
                                    }]}>
                                    {' ' + colName[0].toUpperCase() + colName.substring(1)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
}

export default DataTableHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    headerRow: {
        paddingTop: PADDING_TOP,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green',
        height: '100%'
    },
    headerLabel: {
        color: 'grey',
        fontSize: 12
    }
});
