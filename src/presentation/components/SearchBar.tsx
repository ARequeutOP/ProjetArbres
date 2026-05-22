import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from '../colors';

type Props = {
    setSearchText: (searchText: string) => void;
}

export default function SearchBar( {setSearchText}: Props ) {
    const [localSearchText,setLocalSearchText] = useState("");
    return (
        <View style={styles.container}>
            <Pressable onPress={()=>setSearchText(localSearchText)}>
                <Entypo name="magnifying-glass" size={24} color="black" />
            </Pressable>
            <TextInput placeholder={"Rechercher..."} style={styles.textInput} value={localSearchText} onChangeText={setLocalSearchText}/>
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