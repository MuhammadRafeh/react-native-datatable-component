import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COL_TYPES } from './DataTable';
import Line from './Line';
import CheckBox from './CheckBox';
const { width, height } = Dimensions.get('window');

const DataTableRow = React.memo((props) => {

    //data is object
    const { data, colNames, style, mapColNameToType, widthOfLine, handleOnRowSelect } = props;

    let color = 'black';
    let backgroundColor = 'transparent';
    if (data.doHighlight && data.doHighlight != 'default') {
        color = typeof (data.doHighlight) != 'string' && (data.doHighlight?.textColor); //textColor
        backgroundColor = typeof (data.doHighlight) == 'string' ? data.doHighlight : data.doHighlight?.backgroundColor;
    } else if (data.doHighlight && data.doHighlight === 'default') {
        color = 'white';
        backgroundColor = '#990099';
    }
    return (
        <>

            <View style={[styles.rowContainer, { backgroundColor }]}>
                {
                    colNames.map((name, index) => {
                        const colType = mapColNameToType[name]
                        const textAlign = (colType == COL_TYPES.STRING || colType == null) ? 'left' : (colType == COL_TYPES.CHECK_BOX || colType == COL_TYPES.RADIO) ? 'center' : 'right'
                        let paddingLeft = 0;
                        let paddingRight = 0;
                        if (textAlign == 'left') {
                            paddingRight = 1;
                            paddingLeft = 13
                        } else if (textAlign == 'right') {
                            paddingRight = 13;
                            paddingLeft = 1;

                        }

                        // const handleOnCheckPress = (isChecked) => {
                            // handleOnRowSelect(isChecked, data.id, name)
                        // }
                        // console.log(data[name])
                        return (
                            <View key={index} style={[styles.rowCellContainer, { width: style.defaultEachColumnWidth }]}>
                                {
                                    textAlign == 'center' ? (
                                        <View style={{width: '100%', height: 20, alignItems: 'center', justifyContent: 'center'}}>
                                            <CheckBox info={{name, id: data.id}} handleOnRowSelect={handleOnRowSelect} initialVal={data[name] == true ? true: false}/> 
                                        </View>
                                    ): (
                                        <Text style={[styles.rowCellText, { paddingLeft, paddingRight, textAlign, color }]}>{data[name]}</Text>
                                    )
                                }
                            </View>
                            
                        );
                    })
                }
            </View>

            <Line row width={widthOfLine} />

        </>
    );
})

export default DataTableRow;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'green',
        paddingHorizontal: 10
    },
    rowCellText: {
        color: 'black',
        fontSize: 14.5
    },
    rowCellContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});

