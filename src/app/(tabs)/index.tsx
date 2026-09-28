import { ThemedView } from "@/components/themed-view";
import { HomeScreen } from "@/screens/home-screen";
import { StyleSheet } from "react-native";

export default function Index (){
  return(
    <ThemedView style={styles.container}>
      <HomeScreen/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
});