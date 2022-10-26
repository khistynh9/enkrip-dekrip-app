import React from 'react'
import { Button } from 'react-native'

const ButtonApp = ({onPress = ()=> {}, title = 'SUBMIT'}) => (
    <Button
    title={title}
    onPress={onPress}
    buttonStyle={{
        paddingVertical:10,
        backgroundColor: "#1E3264",
    }}
    containerStyle={{
        width:"100%",
        paddingHorizontal:10,
    }}
    />
);

export default ButtonApp;
