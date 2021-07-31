import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import DataTableRow from './DataTableRow';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export const COL_TYPES = {
    RADIO: 'RADIO',
    INT: 'INT',
    STRING: 'STRING',
    ICON: 'ICON'
}

let TouchableComponent = TouchableOpacity

// if (Platform.OS == 'android' && Platform.Version >= 21) {
//     TouchableComponent = TouchableNativeFeedback
// }


const PADDING_HORIZONTAL = 10;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 15;

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
        this.colNameType = {}
        this.props.colSettings.forEach(setting => {
            if (!this.props.colNames.includes(setting.name)) throw new Error('No Column exists which mentioned in provided colSettings Name!')
            this.colNameType[setting.name] = setting.type;
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

                <View style={styles.headerContainer}>
                    {
                        this.state.colNames.map((colName, index) => {
                            const colType = this.colNameType[colName]
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

                                <TouchableOpacity key={index} style={[styles.headerRow, { width: this.state.defaultEachColumnWidth, justifyContent }]} onPress={this.handleColPress.bind(null, colName)}>
                                    <View style={{ paddingLeft }}>
                                        <Image source={require('../assets/doubleArrow.png')} />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                color: 'grey',
                                                fontSize: 12,
                                                paddingRight,
                                                // backgroundColor: 'green'
                                            }}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit={true}
                                            >
                                            {' ' + colName[0].toUpperCase() + colName.substring(1)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }

                </View>

                <View style={[styles.line, { width: this.state.widthOfContainer }]} />

                {this.state.data &&
                    this.state.data.map((item, index) => <DataTableRow
                        widthOfLine={this.state.widthOfContainer}
                        key={index}
                        data={item}
                        colNameType={this.colNameType}
                        colNames={this.state.colNames}
                        style={{ defaultWidth: this.state.defaultEachColumnWidth }}
                    />)}
                <View style={styles.lastRow}>
                    <View style={styles.noOfPages}>
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>1-2 of 6</Text>
                    </View>
                    
                    <TouchableComponent>
                        <View style={styles.lessThan}>
                            <Image source={require('../assets/lessThan.png')} />
                        </View>
                    </TouchableComponent>
                    <TouchableComponent>
                        <View style={styles.greaterThan}>
                            <Image source={require('../assets/greaterThan.png')} resizeMode={'contain'} style={{ height: 40/2}} />
                        </View>
                    </TouchableComponent>
                </View>
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
        // justifyContent: 'space-around'
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
        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 40,
        // backgroundColor: 'green'
        // paddingBottom: PADDING_BOTTOM,
        // marginRight: 7
    },
    greaterThan: {
        paddingRight: 7,
        paddingLeft: 14.5,
        // paddingTop: 13,
        // paddingBottom: PADDING_BOTTOM,
        justifyContent: 'center',
        // alignItems: 'flex-end',
        height: '100%',
        // backgroundColor: 'green'
    },
    lessThan: {
        paddingLeft: 14.5,
        // paddingTop: 13,
        // paddingBottom: PADDING_BOTTOM,
        paddingRight: 14.5,
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: '#414a4c',
    },
    noOfPages: {
        paddingLeft: 14.5,
        // paddingTop: 12,
        // paddingBottom: PADDING_BOTTOM,
        paddingRight: 14.5,
        justifyContent: 'center'
        // height: 40,
        // backgroundColor: '#414a4c',

    },
    noOfPagesLabel: {
        color: 'grey',
        fontSize: 12
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
