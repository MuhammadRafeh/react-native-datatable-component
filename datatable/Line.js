import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Line = props => <View style={[props.row ? styles.rowLine : styles.headerLine, {width: props.width}]} />

export default Line;

const styles = StyleSheet.create({
    headerLine: {
        height: 0.2,
        backgroundColor: 'grey',
        width,
        alignSelf: 'center'
    },
    rowLine: {
        height: 1,
        backgroundColor: '#e3e3e3',
        width,
        alignSelf: 'center'
    }
});
