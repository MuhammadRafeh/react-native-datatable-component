import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import DataTableRow from './DataTableRow';
import PropTypes from 'prop-types';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import Line from './Line';
import sortData from '../functions/Sort';
import showCurrentProgress from '../functions/showCurrentProgress';

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

const defaultShowRows = 3; //means 3 percent

class DataTable extends React.Component {
    state = {
        data: [], //[{...}, {...}, ....]
        displayData: [], //currentlyDisplayData
        colNames: [],//['ad', 'asd', ...]
        defaultEachColumnWidth: '50%',
        // noOfCols: 0, //default 2, set 0 because of fast rendering at start
        widthOfContainer: width,
        isSortedAssending: { recentlySortedCol: null }, //ColName: true||false
        startDataArray: [],//[{id: startData}]
        endDataArray: [], //[{id, endData}]
        noOfPages: 3, //default
        activeDisplayDataId: 0
    }

    handleColPress = name => {
        const newData = [...this.state.displayData];

        const { recentlySortedCol } = this.state.isSortedAssending

        if (recentlySortedCol == name) {
            // Here we want to sort based on previus col State
            const data = sortData(newData, this.state.isSortedAssending[name], name)
            // console.log(data)
            this.setState(state => ({
                displayData: newData,
                isSortedAssending: {
                    ...state.isSortedAssending,
                    [name]: data.setIsSortedAsc,
                    recentlySortedCol: name
                }
            }))
        } else {
            // Here we want to sort always in ascending Order
            const data = sortData(newData, this.state.isSortedAssending[name], name, true)
            this.setState(state => ({
                displayData: newData,
                isSortedAssending: {
                    ...state.isSortedAssending,
                    [name]: data.setIsSortedAsc,
                    recentlySortedCol: name
                }
            }))
        }
    }

    handleNextPreviousPagePress = (type) => {//next | back
        if (type == 'next') {
            // this.state.activeDisplayDataId
            const activeDisplayId = this.state.activeDisplayDataId;
            const endObj = this.state.endDataArray.find(obj => obj.id == activeDisplayId + 1);
            const startObj = this.state.startDataArray.find(obj => obj.id == activeDisplayId + 1);

            this.setState({
                displayData: this.state.data.slice(startObj.startData - 1, endObj.endData),
                activeDisplayDataId: activeDisplayId + 1
            });

        } else if (type == 'back') {
            const activeDisplayId = this.state.activeDisplayDataId;
            const endObj = this.state.endDataArray.find(obj => obj.id == activeDisplayId - 1);
            const startObj = this.state.startDataArray.find(obj => obj.id == activeDisplayId - 1);

            this.setState({
                displayData: this.state.data.slice(startObj.startData - 1, endObj.endData),
                activeDisplayDataId: activeDisplayId - 1
            });
        }
    }

    componentDidMount() {
        this.colTypes = this.props.colSettings;
        this.mapColNameToType = {}
        this.props.colSettings.forEach(setting => {
            if (!this.props.colNames.includes(setting.name)) throw new Error('No Column exists which mentioned in provided colSettings Name!')
            this.mapColNameToType[setting.name] = setting.type;
        })
        let start = [];
        let end = []
        // console.log( 'asd',this.props.data.length)
        if (this.props.data.length != 0) {
            const progress = showCurrentProgress(this.props?.noOfPages, this.props.data?.length) //[{id, endData}]
            if (progress) {
                start = progress.start;
                end = progress.end;
            }
        }
        this.setState((state) => {
            const noOfCols = this.props.colNames.length;
            const isSortedAssending = {};
            this.props.colNames.forEach(name => {
                isSortedAssending[name] = false;
            })

            const cloneData = [...this.props.data];

            return {
                data: cloneData,
                displayData: cloneData.slice(0, end[0]['endData']),
                colNames: [...this.props.colNames],
                defaultEachColumnWidth: TOTAL_WIDTH / noOfCols + '%',
                isSortedAssending: { ...state.isSortedAssending, ...isSortedAssending },
                activeDisplayDataId: 0, //by default it's zero
                startDataArray: start,
                endDataArray: end
            }
        });
    }

    render() {
        // console.log(this.state.isSortedAssending)

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

                <Line width={this.state.widthOfContainer} header />

                {this.state.data &&
                    this.state.displayData.map((item, index) => (
                        <DataTableRow
                            widthOfLine={this.state.widthOfContainer}
                            key={index}
                            data={item}
                            mapColNameToType={this.mapColNameToType}
                            colNames={this.state.colNames}
                            style={{ defaultEachColumnWidth: this.state.defaultEachColumnWidth }}
                        />
                    ))
                }

                <DataTableFooter
                    start={this.state.startDataArray}
                    end={this.state.endDataArray}
                    activeDataId={this.state.activeDisplayDataId}
                    dataLength={this.state.data.length}
                    handleNextPreviousPagePress={this.handleNextPreviousPagePress}
                />

            </View>
        );
    }
}

export default DataTable;

const styles = StyleSheet.create({
    componentContainer: {
        backgroundColor: '#e4edec',
        paddingHorizontal: PADDING_HORIZONTAL,
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
    noOfPages: PropTypes.number,
    showNoOfRowsPerDisplay: PropTypes.number //default all
}
