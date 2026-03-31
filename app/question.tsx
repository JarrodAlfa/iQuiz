import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function Question() {
      const router = useRouter();

      //fonts
      const [loaded] = useFonts({
        MainFont: require('../assets/fonts/LeagueSpartan-ExtraBold.ttf'),
      });

      //question variables
      const [value1, setValue1] = useState(getRandom(25, 75));
      const [value2, setValue2] = useState(getRandom(25, 75));
      const correctAnswer = value1 + value2;

      //player variables
      const [answer, setAnswer] = useState('');

      function genQuestion() {
        setValue1(getRandom(25, 75))
        setValue2(getRandom(25, 75))
        setAnswer('')
      }

      function checkAnswer() {
        if (Number(answer) === correctAnswer) {
          genQuestion();
        } else {
          setAnswer('')
        }
      }

      function getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
          <View style={styles.questionbox}>
            <Text style={styles.questiontext}>
              Wat is {value1} + {value2} ?
            </Text>
          </View>

          <ImageBackground
            source={require('../assets/images/input_bg.png')}
            style={{
              marginBottom: 20,
              marginTop: 40,
            }}
          >
            <TextInput
              onChangeText={setAnswer}
              value={answer}
              placeholder='.....'
              placeholderTextColor={'#000000'}
              keyboardType="numeric"
              style={styles.answerboxinside}
            />
          </ImageBackground>

          <Pressable 
            onPress={checkAnswer} 
            style={({pressed}) => [
                styles.confirmbutton,
                {
                  transform: [{ scale: pressed ? 0.95 : 1}],
                  shadowOpacity: pressed ? 0 : 0.3
                }
              ]}>
              <Image
              source={require('../assets/images/confirm_button.png')}
              style={{
                width: 140,
                height: 50,
              }}
              />
          </Pressable>

          <Pressable
            onPress={() => router.navigate('/')} //TODO verander dit later
            style={({pressed}) => [
              styles.returnbutton,
              {
                transform: [{ scale: pressed ? 0.95 : 1}],
                shadowOpacity: pressed ? 0 : 0.3
              }
            ]}
          >
            <Image
              source={require('../assets/images/return_arrow.png')}
              style={{
                width: 32,
                height: 32,
              }}
            />

            <Text
              style={{
                fontFamily: 'MainFont',
                fontSize: 20,
              }}
            >
              Keer terug
            </Text>
          </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFBD4',
    flex: 1,
    alignItems: 'center',
  },

  questionbox: {
    width: 350,
    height: 300,

    borderWidth: 7.5,
    borderRadius: 15,
    borderColor: '#DBDBDB',

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  questiontext: {
    fontFamily: 'MainFont',
    fontSize: 26,

    textAlign: 'center',
  },

  answerboxinside: {
    fontFamily: 'MainFont',
    fontSize: 18,

    paddingTop: 5,
    paddingHorizontal: 30,

    textAlign: 'center',

    width: 315,
    height: 65,

    borderWidth: 5,
    borderRadius: 15,
    borderColor: '#DBDBDB'
  },

  confirmbutton: {
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  returnbutton: {
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
