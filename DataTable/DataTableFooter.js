import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LAST_ROW_HEIGHT = 40;

const DataTableFooter = () => {
    return (
        <View style={styles.lastRow}>
            <View style={styles.noOfPages}>
                <Text style={styles.noOfPagesLabel} numberOfLines={1} adjustsFontSizeToFit={true}>1-2 of 6</Text>
            </View>

            <TouchableOpacity>
                <View style={styles.lessThan}>
                    <Image source={require('../assets/lessThan.png')} resizeMode={'contain'} style={{ height: LAST_ROW_HEIGHT / 2 }} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.greaterThan}>
                    <Image source={require('../assets/greaterThan.png')} resizeMode={'contain'} style={{ height: LAST_ROW_HEIGHT / 2 }} />
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
    }
});
