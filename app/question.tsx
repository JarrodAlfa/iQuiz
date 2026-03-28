import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Question() {
      //question variables
      const value1 = 15;
      const value2 = 7;
      const correctAnswer = value1 + value2;

      //player variables
      const [answer, setAnswer] = useState('');

      function checkAnswer() {
        if (Number(answer) === correctAnswer) {
          alert("correct");
        } else {
          alert("wrong")
        }
      }
    
  return (
    <View style={styles.container}>
        <Text>{value1} + {value2}</Text>

        <TextInput
          onChangeText={setAnswer}
          value={answer}
          placeholder="useless placeholder"
          keyboardType="numeric"
          style={{borderWidth: 1,}}
        />

        <Pressable onPress={checkAnswer}>
          <Text>Submit</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
