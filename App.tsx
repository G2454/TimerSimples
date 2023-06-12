import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions  } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function App() {

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const [timeLeft, setTimeleft] = useState(5);
  const [isCounting, setIsCounting] = useState(false);


  const minute = (Math.floor(timeLeft/60)).toString().padStart(2,'0');
  const seconds = Math.floor(timeLeft - (parseFloat(minute))*60).toString().padStart(2,'0');


  const handleStart = () =>{
    if(timeLeft == 0) setTimeleft(60);
    setIsCounting(true);
  }

  const handleStop = () =>{
    setIsCounting(false);
  }

  const handleReset = () => {
    setIsCounting(false);
    setTimeleft(60);
  }


  useEffect(()=>{

    const interval = setInterval(()=>{
      isCounting && 
      setTimeleft((timeLeft) => (timeLeft>=1 ? timeLeft-1 : 0))
    }, 1000);

    if(timeLeft == 0) setIsCounting(false);

    return()=>{
      clearInterval(interval);
    }

  }, [isCounting, timeLeft])

  
  return (
    <SafeAreaView style={styles.container} >
        <View style={styles.display}>
          <Text style={styles.fonts}>{minute}:{seconds}</Text>
          <StatusBar style="auto" />
        </View>

        <View style={{flexDirection:'row', top : height/9}}>
          <TouchableOpacity onPress={handleStart}>
            <View style={[styles.button, {backgroundColor:'#32936F', right:10}]}>
              <Text style={[styles.buttonFont, {color:'#CBFF94'}]}>
                Start
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStop}>
            <View style={[styles.button, {backgroundColor:'#FFBF00'}]}>
              <Text style={[styles.buttonFont, {color:'#FFE500'}]}>
                Stop
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
            <View style={[styles.button, {backgroundColor:'#E83F6F', left:10}]}>
              <Text style={[styles.buttonFont, {color:'#FF9797'}]}>
                Reset
              </Text>
            </View>
          </TouchableOpacity>

        </View>



      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCE7FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fonts:{
    fontSize:80,
    fontWeight:'bold'
  },
  display:{
    width:305,
    height:183,
    backgroundColor:'#76CBFC',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
  button:{
    width:92,
    height:54,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonFont:{
    fontSize:20
  }
});
