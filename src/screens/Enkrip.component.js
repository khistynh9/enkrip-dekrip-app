import React from 'react';
import { View, ScrollView, RefreshControl, Clipboard, Share } from 'react-native';
import {Restart} from 'fiction-expo-restart';
import {Button, Input} from "react-native-elements";
//
import { ButtonApp, CheckBoxApp, ValueApp } from "../components";
import { dataRadio } from "../models";
//
const Enkrip = (props) => {
    //
    const [sIndex, setIndex] = React.useState(0);
    const [inputPlainText, setPlainText] = React.useState('');
    const [inputKeyword, setKeyword] = React.useState('');
    const [outputText, setOutput] = React.useState('');
    //
    const onSubmitKlik = () => {
        let method = dataRadio[sIndex].text;
        if (inputPlainText.length && inputKeyword.length) onInputReady(method);
        else if (!inputPlainText.length) alert('Plain Text Harap Diisi!!');
        else if (!inputKeyword.length) alert('Keyword Harap Diisi!!');
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
    const mod = (n,m) => {
        return ((n % m) + m) % m;
    }
    //
    const onRefresh = React.useCallback(() => {
        Restart();
    }, []);
    //
    const shareValue = () => {
        Share.share({
          message : `Chiper Text :\n${outputText}\n\n[Teknik Enkripsi By KhistyNH]`,
        }).then((result)=> console.log(result)).catch((errorMsg)=>console.log(errorMsg));
    } 
    //
    const onInputReady = (method) => { 
        if (inputKeyword.length && inputPlainText.length) {
          let key = inputKeyword;
          let text = inputPlainText;
          let encrypted = "";
          if (method == 'Vigenere Chiper') {
            let j = 0;
            for (let i = 0; i < text.length; i++) {
              let currentLetter = text[i];
              const A = 65;
              const a = 97;
              
              if(isUpperCase(currentLetter)) {
                //console.log("nilai CR "+currentLetter.charCodeAt(0));
                let Pi = (currentLetter.charCodeAt(0) - A); //10
               
                //console.log("nilai CR K "+key[j % key.length].toUpperCase().charCodeAt());
                //console.log("nilai  Pi "+Pi);
                let Ki = (key[j % key.length].toUpperCase().charCodeAt() - A); //10
                //console.log("nilai Ki "+ Ki);
                let upperLetter = mod(Pi + Ki, 26);
                //console.log("nilai Up "+ upperLetter);
                
                encrypted += String.fromCharCode(upperLetter + A); //85
                //console.log(encrypted);
                j++;
            } else if(isLowerCase(currentLetter)) {
                let Pi = (currentLetter.charCodeAt() - a);
                let Ki = (key[j % key.length].toLowerCase().charCodeAt() - a);
                let lowerLetter = mod(Pi + Ki, 26);
    
                encrypted += String.fromCharCode(lowerLetter + a);
    
                j++;
            } else  {
                encrypted += currentLetter;
            }
      
            } 
          } else if(method == 'Column Transposition') {
            var char = "abcdefghijklmnopqrstuvwxyz";
            var pc = "-";
            key = key.toLowerCase();
            var klen = key.length;
            if (pc == "") pc = "-";
            while (text.length % klen != 0) { //loop column sesuai jml kunci
                text += pc.charAt(0);
            }
            
            var colLength = text.length / klen; // 10/5 = 2
            var k = 0;
            for (let i = 0; i < klen; i++) { //loop sebanyak column
                
                while (k < 26) {
                    var t = key.indexOf(char.charAt(k)); // colum  urutan alfabet key,
                    var arrkw = key.split("");
                    arrkw[t] = "_";
                    key = arrkw.join("");
                    // console.log(key);
                    if (t >= 0) break;
                    else k++;
                }
    
                for (let j = 0; j < colLength; j++) {
                   encrypted += text.charAt(j * klen + t); // 0 * 5 + 3
                }
            }
          } else {
            alert('Method Tidak Di Temukan');
          }        
          setOutput(encrypted);
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
                <Input placeholder="Plain Text" onChangeText={(value) => setPlainText(value)} value={inputPlainText}/>
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
                <ValueApp value={outputText} title={"Chiper Text"} />
                <ButtonApp title={"Copy Text"} onPress={() => Clipboard.setString(outputText)} />
                <Button title={"Share"} onPress={shareValue} buttonStyle={{paddingVertical: 10, backgroundColor: "#0D73EC",marginTop:30,}} containerStyle={{width: "100%",paddingHorizontal: 10,}}/>
            </ScrollView>
        </View>
    )
}

export default Enkrip;

