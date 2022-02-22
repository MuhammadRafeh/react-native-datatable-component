import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COL_TYPES } from './DataTable';

const PADDING_TOP = 20;

const DataTableHeader = React.memo((props) => {

    const { colNames, mapColNameToType, defaultEachColumnWidth, handleColPress } = props;

    return (
        <View style={styles.headerContainer}>
            {
                colNames.map((colName, index) => {
                    const colType = mapColNameToType[colName]
                    const justifyContent = (colType == COL_TYPES.STRING || colType == null) ? 'flex-start' : (colType == COL_TYPES.CHECK_BOX || colType == COL_TYPES.RADIO) ? 'center' : 'flex-end'
                    let paddingLeft = 0;
                    let paddingRight = 0;
                    if (justifyContent == 'flex-start') {
                        paddingLeft = 13
                        paddingRight = 1;
                    } else if (justifyContent == 'flex-end') {
                        paddingRight = 13;
                        paddingLeft = 1
                    }
                    if (colType == COL_TYPES.CHECK_BOX) {
                        return (
                            <View key={index} style={[styles.headerRow, { width: defaultEachColumnWidth, justifyContent }]}>
                                <Text style={[styles.headerLabel, { textAlign: 'center' }]} adjustsFontSizeToFit={true} numberOfLines={20}>{' ' + colName[0].toUpperCase() + colName.substring(1)}</Text>
                            </View>
                        )
                    }
                    return (
                        <TouchableOpacity key={index} style={[styles.headerRow, { width: defaultEachColumnWidth, justifyContent }]} onPress={handleColPress.bind(null, colName)}>
                            <View style={{ paddingLeft }}>
                                <Image source={require('../assets/doubleArrow.png')} />
                            </View>
                            <View style={{ width: paddingLeft == 13 ? '71%' : undefined }}>
                                <Text
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={20}
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
})

export default DataTableHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    headerRow: {
        paddingTop: PADDING_TOP,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    headerLabel: {
        color: 'grey',
        fontSize: 12
    }
});
