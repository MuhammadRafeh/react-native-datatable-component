import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LAST_ROW_HEIGHT = 40;

const DataTableFooter = props => {

    const {start, end, activeDataId, dataLength, handleNextPreviousPagePress} = props    
    
    console.log(start, end, activeDataId, dataLength)

    const mapStartToEndId = {}
    // start.filter(obj => obj.id == activeDataId)
    const startObj = start.find(obj => obj.id == activeDataId);
    const endObj = end.find(obj => obj.id == activeDataId);

    let isShowSingleInfo = false;
    if (startObj?.startData ==  endObj?.endData){
        isShowSingleInfo = true;
    }

    let isDataAvailable = true;
    if (!startObj && !endObj){
        isDataAvailable = false;
    }

    return (
        <View style={styles.lastRow}>
            <View style={styles.noOfPages}>
                {
                    isDataAvailable ? (isShowSingleInfo ? (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>{endObj?.endData} of {dataLength}</Text>
                    ): (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>{startObj?.startData}-{endObj?.endData} of {dataLength}</Text>
                    )): (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>0 of 0</Text>
                    )
                }
            </View>

            <TouchableOpacity disabled={(startObj?.startData == 1 || !isDataAvailable) ? true: false} onPress={handleNextPreviousPagePress.bind(null, 'back')}>
                <View style={styles.lessThan}>
                    <Image source={require('../assets/lessThan.png')} resizeMode={'contain'} style={[styles.iconStyle, {opacity: (startObj?.startData == 1 || !isDataAvailable) ? 0.3: 1}]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={(endObj?.endData == dataLength || !isDataAvailable) ? true: false} onPress={handleNextPreviousPagePress.bind(null, 'next')}>
                <View style={styles.greaterThan}>
                    <Image source={require('../assets/greaterThan.png')} resizeMode={'contain'} style={[styles.iconStyle, {opacity: (endObj?.endData == dataLength || !isDataAvailable) ? 0.3: 1}]} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default DataTableFooter;

const styles = StyleSheet.create({
    lastRow: {
        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: LAST_ROW_HEIGHT,
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
    },
    iconStyle: {
        height: LAST_ROW_HEIGHT / 2
    }
});
