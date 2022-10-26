import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import {Benner} from '../img';

function Info() {

    return (
        <View>
        <View style={{ flex:1,
            backgroundColor: "#fff", alignItems: 'center'}}>
            <Image source={Benner} style={{width: 360, height: 160}} />
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 165,}}>
            <FlatList 
            data={[
                {key: 'Name              : Encrypt and Decrypt App'},
                {key: 'App Version   : 1.0.0'},
                {key: 'Release Date : 22 October 2021'},
                {key: 'Developer       : Khisty N Hanafi (11180012)'},
            ]}
            renderItem={({item}) => <Text style={{padding: 10,
                fontSize: 18, color: '#020202', backgroundColor: "#F7F7F7", borderBottomColor: '#CFD2D6',
                borderBottomWidth: 1,}}>{item.key}</Text>}
            />
        </View>

        </View>
    )
}

export default Info;
