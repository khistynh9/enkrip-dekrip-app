import React from 'react'
import { View, Text } from 'react-native'

const ValueApp = ({
    title = title ? title : '',
    value = '',
}) => (
    <View style={{
        paddingHorizontal:10,
        paddingVertical:15,
    }}>
        <Text style={{
            color:'black',
        }}>{title} :</Text>
        <Text style={{
            fontSize:20,
            color:'black',
            fontWeight:'bold',
        }}>{value.length ? value : '-'}</Text>
    </View>
);

export default ValueApp;
