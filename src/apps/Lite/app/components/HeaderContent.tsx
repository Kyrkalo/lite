import { Image, Text, View, StyleSheet  } from "react-native";

export default function HeaderComponent() {
    return(    
    <View>
        <Text style={styles.titleText}>
          Lite
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    row: {
      height: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',        
    },
    titleContainer: {
      flexDirection: 'row', // Align items in a row
      alignItems: 'center', // Align vertically in the center
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 10, // Space between icon and text
    },
    titleText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    },
  });