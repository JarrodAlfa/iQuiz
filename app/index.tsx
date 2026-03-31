import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Link href="/question">Reken vraag</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
