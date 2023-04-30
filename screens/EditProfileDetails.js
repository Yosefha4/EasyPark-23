import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Auth/Input'
import Button from  '../components/ui/Button'
import { Colors } from '../constants/styles'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'


const EditProfileDetails = () => {

    const [enterName, setEnterName] = useState("");
    const [enterPhoneNumber, setEnterPhoneNumber] = useState("");

    const navigation = useNavigation();


    function changeEnterName(enterText){
        setEnterName(enterText)
    }
    function changeEnterPhone(enterText){
        setEnterPhoneNumber(enterText)
    }

    const handlePressBtn =() =>{

      
      navigation.navigate("Profile",{
        enterName,
        enterPhoneNumber,
      })
      Alert.alert("Success !!!" + enterName)

    }

    return (
        <View style={styles.form}>

<Text style={styles.title}>עריכת פרטים אישיים </Text>

         
         <View style={{marginTop:36}}>
        <Text style={styles.label}>שם מלא </Text>
        <TextInput
          style={styles.input}
          onChangeText={changeEnterName}
          value={enterName}
        />
      </View>
         <View style={{marginTop:36}}>
        <Text style={styles.label}>מספר טלפון</Text>
        <TextInput
        keyboardType='number-pad'
          style={styles.input}
          onChangeText={changeEnterPhone}
          value={enterPhoneNumber}
        />
      </View>
       
    
            <View style={styles.btn}>
              <Button onPress={handlePressBtn} >
                {'עדכון'}
              </Button>
            </View>
         
        </View>
      );
    }
    
    export default EditProfileDetails;
    
    const styles = StyleSheet.create({
        form: {
            flex: 1,
            padding: 24,
            backgroundColor: "#e4f4f4",
        
            
          },
        title: {
            marginVertical: 48,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 24,
            color: Colors.primary500,
        },
      
        label: {
          fontWeight: "bold",
          marginBottom: 4,
          color: Colors.primary500,
          textAlign:'right'
        },
        input: {
          marginVertical: 8,
          paddingHorizontal: 4,
          paddingVertical: 8,
          fontSize: 16,
          borderBottomColor: Colors.primary800,
          borderBottomWidth: 2,
          backgroundColor: 'white',
          textAlign:'right'
        },
        fromTime: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 18,
        },
        calendar: {
          shadowColor: "#171717",
          shadowOffset: { width: 2, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        btn:{
          marginTop:24
        },
      });
      