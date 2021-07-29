import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataTableRow from './DataTableRow';

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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginRight: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Price</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right', paddingLeft: 15, paddingRight: 4 }}>Select</Text>
                    </View>
                </View>
            </View>

            <View style={{ height: 0.2, backgroundColor: 'grey', width: '100%', marginTop: 18, marginBottom: 10 }} />

            {props.data && props.data.map((item, index) => <DataTableRow key={index} data={item} getRowSelectedData={getRowSelectedData} />)}
        </View>
    );
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        marginTop: 20,
        marginBottom: 5
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstColContainer: {
        flex: 1, marginLeft: 20
    },
    firstColLabel: {
        color: 'grey', 
        fontSize: 12
    }
});
