import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DataTableRow from './DataTableRow';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export const COL_TYPES = {
    RADIO: 'RADIO',
    INT: 'INT',
    STRING: 'STRING',
    ICON: 'ICON'
}

const MARGIN_HORIZONTAL = 20;
const MARGIN_TOP = 20;
const MARGIN_BOTTOM = 5;

const TOTAL_WIDTH = 100; //'100%'

// class DataTable extends React.Component {
const DataTable = props => {
    // state = {
    //     selectedData: []
    // }
   
    const [selectedData, setSelectedData] = useState([]);
    const getRowSelectedData = obj => {
        if (obj.checked) {
            //here we add the item
            const data = [...selectedData, obj]
            // this.setState({ selectedData: data })
            setSelectedData(data);
            props.handleSelectionMenu(data);
            return
        } else {
            //here we want to remove item from data
            const data = selectedData.filter(item => item.id != obj.id);
            setSelectedData(data);
            // this.setState({ selectedData: data })
            props.handleSelectionMenu(data);
        }
    }

    // if (props.noOfCols !== props.colNames.length) throw new Error('noOfCols should equal to colNames Length.')
    
    const noOfCols = props.colNames.length;
    
    // const totalWidth = '20%';
    const newEachColWidth = TOTAL_WIDTH / noOfCols + '%'; //'23%'

    return (
        <View style={styles.componentContainer}>

            <View style={styles.headerContainer}>
                {
                    props.colNames.map((colName, index) => {
                        return (
                            <View key={index} style={{ width: newEachColWidth}}>
                                <Text style={{ color: 'grey', fontSize: 12, textAlign: 'center' }}>{colName}</Text>
                            </View>
                        );
                    })
                }
                {/* <View style={styles.firstColContainer}>
                    <Text style={styles.firstColLabel}>Name</Text>
                </View>

                <View style={{ width: '20%' }}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Price</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right', paddingLeft: 15, paddingRight: 4 }}>Select</Text>
                </View> */}

            </View>

            <View style={styles.line} />

            {props.data &&
                props.data.map((item, index) => <DataTableRow
                    key={index}
                    data={item}
                    colNames={props.colNames}
                    styles={{defaultWidth: newEachColWidth}}
                    getRowSelectedData={getRowSelectedData} />)}
        </View>
    );
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        // backgroundColor: 'green',
        marginHorizontal: MARGIN_HORIZONTAL,
        marginTop: MARGIN_TOP,
        marginBottom: MARGIN_BOTTOM
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop: 18,
        marginBottom: 10,
        alignSelf: 'center'
    }
});

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    // noOfCols: PropTypes.number.isRequired,
    colNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    colSettings: PropTypes.arrayOf(PropTypes.objectOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,//Col Name
            type: PropTypes.string, //radio ||  int || string || icon
            width: PropTypes.string,
            showFullText: PropTypes.bool, //tranc || adjustSizeToFit
            noOfLines: PropTypes.number
        })
    )),
    showNoOfRowsAtATime: PropTypes.number //default all
}
