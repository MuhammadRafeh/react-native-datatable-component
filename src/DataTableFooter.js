import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LAST_ROW_HEIGHT = 40;

const DataTableFooter = React.memo((props) => {

    const { start, end, activeDataId, dataLength, handleNextPreviousPagePress } = props

    const startObj = start.find(obj => obj.id == activeDataId);
    const endObj = end.find(obj => obj.id == activeDataId);

    let isShowSingleInfo = false;
    if (startObj?.startData == endObj?.endData) {
        isShowSingleInfo = true;
    }

    let isDataAvailable = true;
    if (!startObj && !endObj) {
        isDataAvailable = false;
    }
    return (
        <View style={styles.lastRow}>
            <View style={styles.noOfPages}>
                {
                    isDataAvailable ? (isShowSingleInfo ? (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>{endObj?.endData} of {dataLength}</Text>
                    ) : (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>{startObj?.startData}-{endObj?.endData} of {dataLength}</Text>
                    )) : (
                        <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>0 of 0</Text>
                    )
                }
            </View>

            <TouchableOpacity style={styles.lessThan} disabled={(startObj?.startData == 1 || !isDataAvailable) ? true : false} onPress={handleNextPreviousPagePress.bind(null, 'back')}>
                <Image source={require('../assets/lessThan.png')} resizeMode={'contain'} style={[styles.iconStyle, { opacity: (startObj?.startData == 1 || !isDataAvailable) ? 0.3 : 1 }]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.lessThan} disabled={(endObj?.endData == dataLength || !isDataAvailable) ? true : false} onPress={handleNextPreviousPagePress.bind(null, 'next')}>
                <Image source={require('../assets/greaterThan.png')} resizeMode={'contain'} style={[styles.iconStyle, { opacity: (endObj?.endData == dataLength || !isDataAvailable) ? 0.3 : 1 }]} />
            </TouchableOpacity>
        </View>
    );
});

export default DataTableFooter;

const styles = StyleSheet.create({
    lastRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: LAST_ROW_HEIGHT,
        paddingHorizontal: 10,
    },
    lessThan: {
        paddingLeft: 14.5,
        paddingRight: 14.5,
        justifyContent: 'center',
        height: '100%'
    },
    noOfPages: {
        paddingLeft: 14.5,
        paddingRight: 14.5,
        justifyContent: 'center'
    },
    noOfPagesLabel: {
        color: 'grey',
        fontSize: 12
    },
    iconStyle: {
        flex: 1
    }
});
