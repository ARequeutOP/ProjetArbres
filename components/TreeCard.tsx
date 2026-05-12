import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    id: number;
    label: string;
    espece: string;
}

export default function TreeCard({ id, label, espece }: Props) {
    return (
        <Link href={`/tree/${id}`} style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.label}>{label ? label : "Inconnu"}</Text>
                <Text style={styles.espece}>{espece ? espece : "Espèce inconnue"}</Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderColor: "#b1b1b1",
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 15,
        width: "95%",
        height: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
    },
    card: {
        paddingLeft: 20,
        flexDirection: "column",
        gap: 5,
    },
    label: {
        fontSize: 25,
        fontWeight: "bold",
    },
    espece: {
        fontSize: 15,
        color: "#707070",
    }
})