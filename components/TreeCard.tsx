import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/model/colors";

type Props = {
    id: number;
    label: string;
    espece: string;
}

export default function TreeCard({ id, label, espece }: Props) {
    const router = useRouter();
    const openTreeDetail = () => {
        router.push({
            pathname: "/tree-detail",
            params: {
                id: id,
                label: label,
            },
        })
    }
    return (
        <Pressable style={styles.cardContainer} onPress={openTreeDetail}>
            <FontAwesome5 name="tree" size={40} color="black" style={styles.tree}/>
            <View style={styles.card}>
                <Text style={styles.label}>{label ? label : "Inconnu"}</Text>
                <Text style={styles.espece}>{espece ? espece : "Espèce inconnue"}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.background,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 10,
        width: "95%",
        height: 80,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignSelf: "center",
    },
    tree: {
        alignSelf: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    card: {
        alignSelf: "center",
        paddingLeft: 20,
        flexDirection: "column",
        gap: 5,
    },
    label: {
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.textPrimary,
    },
    espece: {
        fontSize: 15,
        color: Colors.textSecondary,
    }
})