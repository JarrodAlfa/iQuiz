import { useFonts } from 'expo-font';
import { useLocalSearchParams, useRouter } from "expo-router";
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CreateButton } from './index';

  export function ReturnButton({type}: {type: any}) {
    const [loaded] = useFonts({
      MainFont: require('../assets/fonts/LeagueSpartan-ExtraBold.ttf'),
    });
    const router = useRouter();
    const { subject, questiontype } = useLocalSearchParams();

    return (
      <Pressable
        onPress={() => router.push({
          pathname: type,
          params: { subject, questiontype }
        })}
        style={({pressed}) => [
          styles.returnbutton,
          {
            transform: [{ scale: pressed ? 0.95 : 1}],
            shadowOpacity: pressed ? 0 : 0.3
          },
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
    );
  }

export default function Selection() {
  const { subject } = useLocalSearchParams();

  function CreateUI() {
    if (subject === 'Rekenen') {
      return (
        <>
          <CreateButton
            image={require('../assets/images/math_selection_1.png')}
            subject='Rekenen'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='addsubtract'
            text='Optellen en Aftrekken'
            fontsize={26}
            color="#427D42"
          />

          <CreateButton
            image={require('../assets/images/math_selection_2.png')}
            subject='Rekenen'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='multiplydivide'
            text='Vermenigvuldigen en delen'
            fontsize={26}
            color='#B43024'
          />

          {/* <CreateButton
            image={require('../assets/images/math_selection_3.png')}
            subject='Rekenen'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='fractionpercentage'
            text='Breuken en procenten'
            fontsize={26}
            color='#4A88C4'
          /> */}
       </>
      );
    }

    if (subject === 'Taal') {
      return (
        <>
          <CreateButton
            image={require('../assets/images/english_selection.png')}
            subject='Taal'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='english'
            text='Engels - Nederlands'
            fontsize={26}
            color='#4A88C4'
          />

          <CreateButton
            image={require('../assets/images/dutch_selection.png')}
            subject='Taal'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='dutch'
            text='Nederlands - Engels'
            fontsize={26}
            color='#B49616'
          />
       </>
      );
    }

    if (subject === 'Topografie') {
      return (
        <>
          <CreateButton
            image={require('../assets/images/dutch_selection.png')}
            subject='Topografie'
            imagewidth={350}
            imageheight={85}
            type='/question'
            questiontype='netherlands'
            text='Nederland'
            fontsize={26}
            color='#B49616'
          />
       </>
      );
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FDFBD4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subjecttext}>
          { subject }
        </Text>
        <CreateUI/>
        <ReturnButton
          type='/'
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
  },

  button: {
    width: 350,
    height: 85,
  },

  button_shadows: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,

    padding: 10,
  },

  returnbutton: {
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  subjecttext: {
    fontFamily: 'MainFont',
    fontSize: 26,
  }
});
