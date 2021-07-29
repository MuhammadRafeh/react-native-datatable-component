import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import DataTableRow from './DataTableRow';

const {width, height} = Dimensions.get('window');

const MARGIN_HORIZONTAL = 20;
const MARGIN_TOP = 20;
const MARGIN_BOTTOM = 5;

const DataTable = props => {
    // props will be array of objects
    const [selectedData, setSelectedData] = useState([]);
    const getRowSelectedData = obj => {
        if (obj.checked) {
            //here we add the item
            const data = [...selectedData, obj]
            setSelectedData(data);
            props.handleSelectionMenu(data);
            return
        } else {
            //here we want to remove item from data
            const data = selectedData.filter(item => item.id != obj.id);
            setSelectedData(data);
            props.handleSelectionMenu(data);
        }
    }

    return (
        <View style={styles.componentContainer}>

            <View style={styles.headerContainer}>

                <View style={styles.firstColContainer}>
                    <Text style={styles.firstColLabel}>Name</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginRight: 20 }}> */}
                <View style={{width: '20%'}}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Price</Text>
                </View>
                <View style={{width: '30%'}}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right', paddingLeft: 15, paddingRight: 4 }}>Select</Text>
                </View>
                {/* </View> */}
            </View>

            <View style={styles.line} />

            {props.data && props.data.map((item, index) => <DataTableRow key={index} data={item} getRowSelectedData={getRowSelectedData} />)}
        </View>
    );
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        marginHorizontal: MARGIN_HORIZONTAL,
        marginTop: MARGIN_TOP,
        marginBottom: MARGIN_BOTTOM
    },
    headerContainer: {
        // flex: 1, 
        flexDirection: 'row',
        // justifyContent: 'space-between'
        // marginHorizontal: MARGIN_HORIZONTAL,
    },
    firstColContainer: {
        // flex: 1, 
        // marginLeft: 20
        width: '50%',
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
