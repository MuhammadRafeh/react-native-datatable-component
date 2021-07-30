import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DataTableRow from './DataTableRow';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export const COL_TYPES = {
    RADIO: 'RADIO',
    INT: 'INT',
    STRING: 'STRING',
    ICON: 'ICON'
}


const PADDING_HORIZONTAL = 15;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 10;

const TOTAL_WIDTH = 100; //'100%'

const DataTable = props => {
    
    const handleColPress = (name) => {
        console.log(name)
    }

    const noOfCols = props.colNames.length;

    const newEachColWidth = TOTAL_WIDTH / noOfCols + '%'; //'23%'

    const colTypes = props.colSettings

    const colNameType = {}

    props.colSettings.forEach(setting => {
        if (!props.colNames.includes(setting.name)) throw new Error('No Column exists which mentioned in provided colSettings Name!')
        colNameType[setting.name] = setting.type;
    })

    return (
        <View style={styles.componentContainer}>

            <View style={styles.headerContainer}>
                {
                    props.colNames.map((colName, index) => {
                        const colType = colNameType[colName]
                        const textAlign = (colType == COL_TYPES.STRING || colType == null) ? 'left' : (colType == COL_TYPES.ICON || colType == COL_TYPES.RADIO) ? 'center' : 'right'
                        let paddingLeft = 0;
                        let paddingRight = 0;
                        if (textAlign == 'left') {
                            paddingLeft = 13
                            paddingRight = 1;
                        } else if (textAlign == 'right') {
                            paddingRight = 13;
                            paddingLeft = 1
                        }
                        return (

                            <TouchableOpacity key={index} style={[styles.headerRow, { width: newEachColWidth }]} onPress={handleColPress.bind(null, colName)}>
                                <Text
                                    style={{
                                        color: 'grey',
                                        fontSize: 12,
                                        textAlign,
                                        paddingLeft,
                                        paddingRight
                                    }}>
                                    <Image source={require('../assets/arrow2.png')} />

                                    {' ' + colName}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                }

            </View>

            <View style={styles.line} />

            {props.data &&
                props.data.map((item, index) => <DataTableRow
                    key={index}
                    data={item}
                    colNameType={colNameType}
                    colNames={props.colNames}
                    style={{ defaultWidth: newEachColWidth }}
                    // getRowSelectedData={getRowSelectedData} 
                    />)}
            <View style={styles.lastRow}>

            </View>
        </View>
    );
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        // backgroundColor: 'green',
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingBottom: PADDING_BOTTOM,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    headerRow: {
        paddingTop: PADDING_TOP,
        paddingBottom: 18,
        // backgroundColor: 'green'
    },
    firstColContainer: {
        width: '20%',
        // backgroundColor: 'green'
    },
    firstColLabel: {
        color: 'grey',
        fontSize: 12
    },
    line: {
        height: 0.2,
        backgroundColor: 'grey',
        width,
        alignSelf: 'center'
    },
    lastRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    colNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    colSettings: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,//Col Name
            type: PropTypes.string, //radio ||  int || string || icon
            width: PropTypes.string,
            showFullText: PropTypes.bool, //tranc || adjustSizeToFit
            noOfLines: PropTypes.number
        })
    ),
    showNoOfRowsAtATime: PropTypes.number //default all
}
