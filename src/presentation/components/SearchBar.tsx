import { Colors } from '@/src/core/colors';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <Entypo name="magnifying-glass" size={24} color="black" />
            <TextInput placeholder={"Rechercher..."} style={styles.textInput} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        backgroundColor: Colors.background,
        borderColor: Colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: "row",
        width: "70%",
        height: 40,
        gap: 10,
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 18,
        color: Colors.primary,
    }
})