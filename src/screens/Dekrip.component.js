import React from 'react';
import { View, ScrollView, RefreshControl, Clipboard } from 'react-native';
import {Restart} from 'fiction-expo-restart';
import { Input } from "react-native-elements";
//
import { ButtonApp, CheckBoxApp, ValueApp } from "../components";
import { dataRadio } from "../models";
//
const Dekrip = (props) => {
    //
    const [sIndex, setIndex] = React.useState(0);
    const [inputChiperText, setChiperText] = React.useState('');
    const [inputKeyword, setKeyword] = React.useState('');
    const [outputText, setOutput] = React.useState('');
    //
    const onSubmitKlik = () => {
        let method = dataRadio[sIndex].text;
        if (inputChiperText.length && inputKeyword.length) onInputReady(method);
        else if (!inputChiperText.length) alert('Plain Text Harap Diisi!!');
        else if (!inputKeyword.length) alert('Keyword Harap Diisi!!');
    }
    //
    const mod = (n,m) => {
        return ((n % m) + m) % m;
    }
    //
    const isUpperCase = (letter) => {
        var l = letter.charCodeAt();
        if (l > 64 && l < 91) {
          return true;
        } else {
          return false;
        }
    }
    //
    const isLowerCase = (letter) => {
        let l = letter.charCodeAt();
        if(l > 96 && l < 123) {
            return true;
        } else {
            return false;
        }
    }
    //
    const onRefresh = React.useCallback(() => {
        Restart();
    }, []);
    //
    const onInputReady = (method) => { 
        if (inputKeyword.length && inputChiperText.length) {
            let key = inputKeyword;
            let text = inputChiperText;
            let decrypted = "";
            if (method == 'Vigenere Chiper') {
              let j = 0;
              for (let i = 0; i < text.length; i++) {
                let currentLetter = text[i];
                const A = 65;
                const a = 97;
          
                if (isUpperCase(currentLetter)) {
                    let Ci = (currentLetter.charCodeAt(0) - A);
                    let Ki = (key[j % key.length].toUpperCase()).charCodeAt() - A;
                    let upperLetter = mod(Ci - Ki, 26);
        
                    decrypted += String.fromCharCode(upperLetter + A);
        
                    j++;
                } else if(isLowerCase(currentLetter)) {
                    let Ci = (currentLetter.charCodeAt(0) - a);
                    let Ki = (key[j % key.length].toLowerCase()).charCodeAt() - a;
                    let lowerLetter = mod(Ci - Ki, 26);
        
                    decrypted += String.fromCharCode(lowerLetter + a);
        
                    j++;
                } else {
                  decrypted += currentLetter;
                }
              } 
            } else if(method == 'Column Transposition') {
              var chars = "abcdefghijklmnopqrstuvwxyz";
              var klen = key.length;
              key = key.toLowerCase();
              var cols = new Array(klen);
              var colLength = text.length / klen;
              for (let i = 0; i < klen; i++) cols[i] = text.substr(i * colLength, colLength);
              
              // now we rearrange the columns so that they are in their unscrambled state
              var newcols = new Array(klen);
              var j = 0;
              var i = 0;
              while (j < klen) {
                  var t = key.indexOf(chars.charAt(i));
                  if (t >= 0) {
                      newcols[t] = cols[j++];
                      var arrkw = key.split("");
                      arrkw[t] = "_";
                      key = arrkw.join("");
                  } else i++;
              }
    
              for (let i = 0; i < colLength; i++) {
                  for (let j = 0; j < klen; j++) {
                      decrypted += newcols[j].charAt(i);
                  }
              }
              decrypted = decrypted.replace(/-/g, '');
            } else {alert('Method Tidak Di Temukan');}
             
          setOutput(decrypted);
        } else {
          setOutput('');
        }
    }
    //
    return (
        <View 
        style={{
                flex:1,
                backgroundColor: "#fff",
                paddingHorizontal:10,
                paddingVertical:10,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                />
                }
            >
                <Input  placeholder="Chiper Text" onChangeText={(value) => setChiperText(value)} value={inputChiperText} />
                {dataRadio.map((e, index) => {
                return (
                    <CheckBoxApp
                    key={index}
                    title={e.text}
                    checked={sIndex == index ? true : false}
                    onPress={() => setIndex(index)}
                    />
                );
                })}
                {dataRadio[sIndex].keyword ? (
                <Input placeholder="Key" onChangeText={(value) => setKeyword(value)} value={inputKeyword} />
                ) : (
                <View
                    style={{
                    marginVertical: 10,
                    }}
                />
                )}
                <ButtonApp onPress={onSubmitKlik} />
                <ValueApp value={outputText} title={"Plain Text"} />
                <ButtonApp title={"Copy Text"} onPress={() => Clipboard.setString(outputText)} />
            </ScrollView>
        </View>
    )
}

export default Dekrip;

