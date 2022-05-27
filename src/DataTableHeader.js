import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COL_TYPES } from './DataTable';

const PADDING_TOP = 20;

const DataTableHeader = React.memo((props) => {

    const { colNames, mapColNameToType, defaultEachColumnWidth, handleColPress, doSort, eachColWidth, style } = props;

    const isDoSort = doSort == false ? false : true;

    return (
        <View style={styles.headerContainer}>
            {
                colNames.map((colName, index) => {
                    const colWidth = eachColWidth[colName] == undefined ? defaultEachColumnWidth : eachColWidth[colName];
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
                            <View key={index} style={[styles.headerRow, { width: colWidth, justifyContent }]}>
                                <Text style={[styles.headerLabel, { textAlign: 'center' }, style]} adjustsFontSizeToFit={true} numberOfLines={20}>{' ' + colName[0].toUpperCase() + colName.substring(1)}</Text>
                            </View>
                        )
                    }
                    if (isDoSort) {
                        return (
                            <TouchableOpacity key={index} style={[styles.headerRow, { width: colWidth, paddingLeft, paddingRight }]} onPress={handleColPress.bind(null, colName)}>
                                <View style={{ flex: paddingRight == 13 ? 1 : undefined, alignItems: paddingRight == 13 ? 'flex-end' : undefined, minWidth: 8 }}>
                                    <Image source={require('../assets/doubleArrow.png')} />
                                </View>
                                <View style={{ width: paddingLeft == 13 ? '71%' : undefined }}>
                                    <Text
                                        adjustsFontSizeToFit={true}
                                        numberOfLines={20}
                                        style={[styles.headerLabel, style]}>
                                        {' ' + colName[0].toUpperCase() + colName.substring(1)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    } else {
                        const isLeft = paddingLeft == 1 ? false : true;
                        return (
                            <View style={{ width: colWidth, paddingTop: PADDING_TOP, paddingBottom: 18 }} key={index}>
                                <Text style={{ ...styles.headerLabel, paddingLeft, paddingRight, textAlign: isLeft ? 'left' : 'right', left: isLeft ? -0.5 : undefined, ...style }}
                                    adjustsFontSizeToFit={true}
                                    numberOfLines={20}
                                >
                                    {colName[0].toUpperCase() + colName.substring(1)}</Text>
                            </View>
                        )
                    }
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
        height: '100%',
    },
    headerLabel: {
        color: 'grey',
        fontSize: 12
    }
});
