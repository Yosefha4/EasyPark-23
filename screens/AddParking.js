import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParkingForm from '../components/parkings/ParkingForm'

const AddParking = ({navigation}) => {

  function createParkingHandler(parking){

    navigation.navigate("DemoS", {
      parking:parking
    })
  }
  return (
   
    <ParkingForm onCreateParking={createParkingHandler}/>

  )
}

export default AddParking

const styles = StyleSheet.create({
  const:{
    flex:1,
   
  }
})