import { Colors } from '@/src/core/colors';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <Entypo name="magnifying-glass" size={24} color="black" />
            <TextInput style={styles.textInput}>Search...</TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        backgroundColor: Colors.background,
        borderColor: Colors.border,
        borderWidth: 3,
        borderRadius: 10,
        flexDirection: "row",
        width: "70%",
        height: 40,
        gap: 10,
        alignItems: "center",
    },
    textInput: {
        fontSize: 20,
        color: Colors.primary,
    }
})