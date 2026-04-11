import { useRouter } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function CreateButton({image, subject, imagewidth, imageheight, type, questiontype, text, fontsize, color}: {image: any; subject: string; imagewidth: number; imageheight: number; type: any; questiontype: any; text: string; fontsize: number; color: string}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({
          pathname: type,
          params: { subject, questiontype },
        })
      }
      style={({pressed}) => [
        styles.button_shadows,
        {
          transform: [{ scale: pressed ? 0.95 : 1}],
          shadowOpacity: pressed ? 0 : 0.3
        },
      ]}
    >
      <ImageBackground
        source={image}
        style={{
          width: imagewidth,
          height: imageheight,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'MainFont',
            fontSize: fontsize,
            color: color,
          }}
        >
          {text}
        </Text>
      </ImageBackground>
    </Pressable>
  );
}

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FDFBD4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <CreateButton
          image={require('../assets/images/math_button.png')}
          subject="Rekenen"
          imagewidth={350}
          imageheight={135}
          type='/selection'
          questiontype=''
          text='Rekenen'
          fontsize={36}
          color="#427D42"
        />

        <CreateButton
          image={require('../assets/images/lang_button.png')}
          subject="Taal"
          imagewidth={350}
          imageheight={135}
          type='/selection'
          questiontype=''
          text='Taal'
          fontsize={36}
          color='#B43024'
        />

        <CreateButton
          image={require('../assets/images/topo_button.png')}
          subject="Topografie"
          imagewidth={350}
          imageheight={135}
          type='/selection'
          questiontype=''
          text='Topografie'
          fontsize={36}
          color='#4A88C4'
        />

        <CreateButton
          image={require('../assets/images/shop_button.png')}
          subject="Winkel"
          imagewidth={350}
          imageheight={135}
          type='/selection'
          questiontype=''
          text='Winkel'
          fontsize={36}
          color='#B49616'
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  button_shadows: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,

    padding: 10,
  },
});
