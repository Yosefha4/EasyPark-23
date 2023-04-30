import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/ui/Button'
import ClockTimerCount from '../components/parkings/ClockTimerCount'

const ParkingDetails = ({route, navigation}) => {

  const {parking } = route.params
    
    // console.log(thisparking)
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

        <View style={styles.container}>

        <Text style={styles.title}>{parking.title}</Text>
        <Text style={styles.address}>{parking.address}</Text>
        {/* <Text>ParkingOwnerId : {parking.ownerParkingId}</Text> */}
        {/* <Text>{parking.desc}</Text> */}
        <Text style={styles.price}>{parking.price}₪ / שעה</Text>
        {/* <Text>{parking.imageUri}</Text> */}
        {/* <Text>{parking.id}</Text> */}
        {/* <Text>{`Location :{ lat: ${parking.location.lat} , lng: ${parking.location.lng}}`}</Text> */}

        <ClockTimerCount parking={parking}/>


        <Image source={{uri:parking.imageUri}} style={{width:200, height:200, marginTop:40}}/>
        <View style={{marginTop:30}}>
      <Button children="Rent" onPress={()=> Alert.alert("For Rent ...")} />
      </View></View>

      </View>

  )
}

export default ParkingDetails

const styles = StyleSheet.create({  
  container:{
    flex:1,
    gap:4,
    padding: 20,
    width:250,
  
    // justifyContent:'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor:"#ffff",
    color:'black',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

},
title:{
  fontWeight:'bold',
  fontSize:18,
  marginBottom:24,
  textAlign:'center',

},
address:{
  textAlign:'center'
},
price:{
  fontWeight:'bold',
  color:'gray',
  marginTop:14,
  marginBottom:24,
  textAlign:'center',
  borderWidth:1,
  borderColor:'black',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,

}})