import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../colors";

type Props = {
    label: string;
    espece: string;
}

export default function TreeCard({ label, espece }: Props) {
    
    return (
        <View style={styles.cardContainer}>
            <FontAwesome5 name="tree" size={40} color="black" style={styles.tree}/>
            <View style={styles.card}>
                <Text style={styles.label}>{label ? label : "Inconnu"}</Text>
                <Text style={styles.espece}>{espece ? espece : "Espèce inconnue"}</Text>
            </View>
        </View>
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