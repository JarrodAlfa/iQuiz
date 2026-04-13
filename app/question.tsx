import { useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { Image, ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { ReturnButton } from './selection';
import { useStats } from './StatsContext';

export default function Question() {
  const { subject, questiontype } = useLocalSearchParams();

  function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
      
  //question variables
  const [keyboardType, setKeyboardType] = useState<KeyboardTypeOptions>('default');

  const [value1, setValue1] = useState(getRandom(25, 75));
  const [value2, setValue2] = useState(getRandom(25, 75));
  const [questionType, setQuestionType] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0)
  
  const langWords: [string, string][] = [
    ['dog', 'hond'],
    ['cat', 'kat'],
    ['bird', 'vogel'],
    ['fish', 'vis'],
    ['horse', 'paard'],
    ['cow', 'koe'],
    ['pig', 'varken'],
    ['sheep', 'schaap'],
    ['goat', 'geit'],

    ['house', 'huis'],
    ['door', 'deur'],
    ['window', 'raam'],
    ['chair', 'stoel'],
    ['table', 'tafel'],
    ['bed', 'bed'], // ok, lijkt anders genoeg

    ['tree', 'boom'],
    ['flower', 'bloem'],
    ['grass', 'gras'],
    ['leaf', 'blad'],

    ['sun', 'zon'],
    ['moon', 'maan'],
    ['star', 'ster'],
    ['sky', 'lucht'],
    ['cloud', 'wolk'],
    ['rain', 'regen'],
    ['snow', 'sneeuw'],
    ['wind', 'wind'], // borderline maar ok

    ['day', 'dag'],
    ['night', 'nacht'],
    ['morning', 'ochtend'],
    ['evening', 'avond'],

    ['red', 'rood'],
    ['blue', 'blauw'],
    ['green', 'groen'],
    ['yellow', 'geel'],
    ['black', 'zwart'],
    ['white', 'wit'],

    ['big', 'groot'],
    ['small', 'klein'],
    ['long', 'lang'],
    ['short', 'kort'],
    ['fast', 'snel'],
    ['slow', 'langzaam'],

    ['happy', 'blij'],
    ['sad', 'verdrietig'],
    ['angry', 'boos'],
    ['tired', 'moe'],

    ['eat', 'eten'],
    ['drink', 'drinken'],
    ['sleep', 'slapen'],
    ['run', 'rennen'],
    ['walk', 'lopen'],
    ['jump', 'springen'],

    ['father', 'vader'],
    ['mother', 'moeder'],
    ['brother', 'broer'],
    ['sister', 'zus'],
    ['friend', 'vriend'],
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(getRandom(0, langWords.length - 1))
  const [eWord, dWord] = langWords[currentWordIndex] ?? ['', ''];

  React.useEffect(() => {
    GenerateQuestion();
  }, []);

  //header stats
  const { addCoins, removeCoins, addHearts, removeHearts, addStreak, resetStreak } = useStats();

  //player variables
  const [answer, setAnswer] = useState('');

  function checkAnswer() {

    if (subject === 'Rekenen') {
      if (Number(answer) === correctAnswer) {
        GenerateQuestion();
        addCoins(getRandom(1, 10))
        addStreak();
      } else {
        setAnswer('');
        resetStreak();
      }
    } else if (subject === 'Taal') {
      if (questiontype === 'english') {
        if (answer.trim().toLowerCase() === dWord.trim().toLowerCase()) {
          GenerateQuestion();
          addCoins(getRandom(1, 10))
          addStreak();
        } else {
          setAnswer('');
          resetStreak();
        }
      } else if (questiontype === 'dutch') {
        if (answer.trim().toLowerCase() === eWord.trim().toLowerCase()) {
          GenerateQuestion();
          addCoins(getRandom(1, 10))
          addStreak();
        } else {
          setAnswer('');
          resetStreak();
        }        
      }
    }
  }

  function GenerateQuestion() {
    if (subject === 'Rekenen') {
      setKeyboardType('numeric')
    } else if (subject === 'Taal') {
      setKeyboardType('default')
    }

    if ( questiontype === 'english' || questiontype === 'dutch') {
      let newIndex;
      do {
        newIndex = getRandom(0, langWords.length - 1);
      } while (newIndex === currentWordIndex);

      setCurrentWordIndex(newIndex);
    }

    const newQuestionType = getRandom(0,1)

    if ( questiontype === 'addsubtract') {

      if (newQuestionType === 0) {
        const newValue1 = getRandom(25, 75)
        const newValue2 = getRandom(25, 75)

        setValue1(newValue1)
        setValue2(newValue2)
        setCorrectAnswer(newValue1 + newValue2)
        setQuestionType(newQuestionType)
      } else {
        const newValue1 = getRandom(25, 75)
        const newValue2 = getRandom(25, newValue1)

        setValue1(newValue1)
        setValue2(newValue2)
        setCorrectAnswer(newValue1 - newValue2)
        setQuestionType(newQuestionType)
      }
    } else if ( questiontype === 'multiplydivide') {
      if (newQuestionType === 0) {
        const newValue1 = getRandom(1, 12)
        const newValue2 = getRandom(1, 12)

        setValue1(newValue1)
        setValue2(newValue2)
        setCorrectAnswer(Math.ceil(newValue1 * newValue2))
        setQuestionType(newQuestionType)
      } else {
        const newAnswer = getRandom(2, 10)
        const newValue2 = getRandom(2, 10)
        const newValue1 = newAnswer * newValue2

        setValue1(newValue1)
        setValue2(newValue2)
        setCorrectAnswer(newAnswer)
        setQuestionType(newQuestionType)
      }
    } else if (questiontype === 'fractionpercentage') {

    }

    setAnswer('')
  }

  function RenderQuestion() {
    if (questiontype === 'english') {
      return (
        <View style={styles.languageQuestion}>
          <Text style={styles.topText}>Vertaal het woord</Text>
          <Text style={styles.wordHighlight}>{eWord}</Text>
          <Text style={styles.bottomText}>naar het Nederlands</Text>
        </View>
      );
    }

    if (questiontype === 'dutch') {
      return (
        <View style={styles.languageQuestion}>
          <Text style={styles.topText}>Vertaal het woord</Text>
          <Text style={styles.wordHighlight}>{dWord}</Text>
          <Text style={styles.bottomText}>naar het Engels</Text>
        </View>
      );
    }

    return (
      <Text style={styles.questiontext}>
        {GetQuestion()}
      </Text>
    );
  }

  function GetQuestion() {
    if (questiontype === 'addsubtract') {
      if (questionType === 0) {
        return 'Wat is ' + value1 + ' + ' + value2 + ' ?'
      }
      else {
        return 'Wat is ' + value1 + ' - ' + value2 + ' ?'
      }
    } else if (questiontype === 'multiplydivide')
    {
      if (questionType === 0) {
        return 'Wat is ' + value1 + ' x ' + value2 + ' ?'
      }
      else {
        return 'Wat is ' + value1 + ' ÷ ' + value2 + ' ?'
      }
    }
  }
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
          <View style={styles.questionbox}>
            <Text style={styles.questiontext}>
              {RenderQuestion()}
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
              placeholder="....."
              placeholderTextColor="#000000"
              keyboardType={keyboardType}
              autoCorrect={false}
              autoCapitalize="none"
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
          <ReturnButton
            type='/selection'
          />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFBD4',
    flex: 1,
    justifyContent: 'center',
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

    lineHeight: 36,

    textAlign: 'center',
    paddingHorizontal: 20
  },

  answerboxinside: {
    fontFamily: 'MainFont',
    fontSize: 20,

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

  languageQuestion: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  topText: {
    fontFamily: 'MainFont',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 22,
  },

  wordHighlight: {
    textDecorationLine: 'underline',
    fontFamily: 'MainFont',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 22,
  },

  bottomText: {
    fontFamily: 'MainFont',
    fontSize: 24,
    textAlign: 'center',
  },
});
