import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
    const [loaded] = useFonts({
            MainFont: require('../assets/fonts/LeagueSpartan-ExtraBold.ttf'),
          });
    
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}
        >
            <Pressable 
                onPress={() => router.navigate('/')}
                style={({pressed}) => [
                styles.profile_shadow,
                {
                  transform: [{ scale: pressed ? 0.95 : 1}],
                  shadowOpacity: pressed ? 0 : 0.3
                }
                ]}>

                <Image
                source={require('../assets/images/profile_button.png')}
                style={styles.profile_button}
                />

            </Pressable>

            <View style={styles.shadows}>
                <Image
                    source={require('../assets/images/health_icon.png')}
                    style={styles.icon}
                />

                <Text style={styles.text}>123</Text>
            </View>

            <View style={styles.shadows}>
                <Image
                    source={require('../assets/images/coins_icon.png')}
                    style={styles.icon}
                />

                <Text style={styles.text}>123</Text>
            </View>

            <View style={styles.shadows}>
                <Image
                    source={require('../assets/images/streak_icon.png')}
                    style={styles.icon}
                />

                <Text style={styles.text}>123</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            height: 125,
            backgroundColor: 'transparent',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',

            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,

            zIndex: 10,
        },

        profile_button: {
            width: 64,
            height: 64,
        },

        profile_shadow: {
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },

        icon: {
            width: 32,
            height: 32,
            marginRight: 10,
        },

        shadows: {
            alignItems: 'center',
            flexDirection: 'row',

            shadowColor: '#000',
            shadowOffset: { width: 4, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },
        
        text: {
            lineHeight: 50,
            fontFamily: 'MainFont',
            fontSize: 16,
        }
    });