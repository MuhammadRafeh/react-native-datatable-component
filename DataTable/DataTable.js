import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import DataTableRow from './DataTableRow';
import PropTypes from 'prop-types';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';

const { width, height } = Dimensions.get('window');

export const COL_TYPES = {
    RADIO: 'RADIO',
    INT: 'INT',
    STRING: 'STRING',
    ICON: 'ICON'
}

// let TouchableComponent = TouchableOpacity

// if (Platform.OS == 'android' && Platform.Version >= 21) {
//     TouchableComponent = TouchableNativeFeedback
// }


const PADDING_HORIZONTAL = 10;

const TOTAL_WIDTH = 100; //'100%'

class DataTable extends React.Component {
    state = {
        data: [], //[{...}, {...}, ....]
        colNames: [],//['ad', 'asd', ...]
        defaultEachColumnWidth: '50%',
        noOfCols: 0, //default 2, set 0 because of fast rendering at start
        widthOfContainer: width,
        isSortedAssending: { recentlySortedCol: null } //ColName: true||false
    }

    sortData = (data, colName, sortAssending = false) => {// colName = name Of Col
        const isSortAssending = this.state.isSortedAssending[colName];
        let setIsSortedAsc = false;
        if (sortAssending || !isSortAssending) { //here sorting Asc
            // console.log('asc')
            data.sort(function (a, b) {
                if (a[colName] > b[colName]) {
                    return 1;
                }
                if (b[colName] > a[colName]) {
                    return -1;
                }
                return 0;
            });
            setIsSortedAsc = true;
        } else if (isSortAssending) { //here sorting Desc
            // console.log('desc')
            data.sort(function (a, b) {
                if (a[colName] > b[colName]) {
                    return -1;
                }
                if (b[colName] > a[colName]) {
                    return 1;
                }
                return 0;
            });
        }

        this.setState(state => ({
            data,
            isSortedAssending: {
                ...state.isSortedAssending,
                [colName]: setIsSortedAsc,
                recentlySortedCol: colName
            }
        }))

    }

    handleColPress = name => {
        const newData = [...this.state.data];

        if (this.state.isSortedAssending.recentlySortedCol == name) {
            // Here we want to sort based on previus col State
            this.sortData(newData, name)
        } else {
            // Here we want to sort always in ascending Order
            this.sortData(newData, name, true)
        }

        // this.setState({data: newData})
    }

    componentDidMount() {
        this.colTypes = this.props.colSettings;
        this.mapColNameToType = {}
        this.props.colSettings.forEach(setting => {
            if (!this.props.colNames.includes(setting.name)) throw new Error('No Column exists which mentioned in provided colSettings Name!')
            this.mapColNameToType[setting.name] = setting.type;
        })
        this.setState((state) => {
            const noOfCols = this.props.colNames.length;
            const isSortedAssending = {};
            this.props.colNames.forEach(name => {
                isSortedAssending[name] = false;
            })

            return {
                data: [...this.props.data],
                colNames: [...this.props.colNames],
                defaultEachColumnWidth: TOTAL_WIDTH / noOfCols + '%',
                noOfCols: noOfCols,
                isSortedAssending: { ...state.isSortedAssending, ...isSortedAssending }
            }
        });
    }

    render() {
        // console.log(this.state.isSortedAssending)
        const a = 'a';
        // a.
        return (
            <View style={styles.componentContainer}
                onLayout={e => {
                    this.setState({ widthOfContainer: e.nativeEvent.layout.width })
                }}>

                <DataTableHeader
                    colNames={this.state.colNames}
                    mapColNameToType={this.mapColNameToType}
                    defaultEachColumnWidth={this.state.defaultEachColumnWidth}
                    handleColPress={this.handleColPress}
                />

                <View style={[styles.line, { width: this.state.widthOfContainer }]} />

                {this.state.data &&
                    this.state.data.map((item, index) => <>
                        <DataTableRow
                            key={index}
                            data={item}
                            mapColNameToType={this.mapColNameToType}
                            colNames={this.state.colNames}
                            style={{ defaultEachColumnWidth: this.state.defaultEachColumnWidth }}
                        />
                        <View style={[styles.line, {
                            width: this.state.widthOfContainer,
                            height: 1,
                            backgroundColor: '#e3e3e3',
                        }]} />
                    </>
                    )
                }

                <DataTableFooter />

            </View>
        );
    }
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        backgroundColor: '#e4edec',
        paddingHorizontal: PADDING_HORIZONTAL,
    },
    line: {
        height: 0.2,
        backgroundColor: 'grey',
        width,
        alignSelf: 'center'
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
    showNoOfRowsPerDisplay: PropTypes.number //default all
}
