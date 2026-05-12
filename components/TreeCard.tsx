import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

type Props = {
    id: number;
    label: string;
}

export default function TreeCard({ id, label }: Props) {
    return (
        <Link href={`/tree/${id}`} style={styles.card}>
            <Text style={styles.label}>{label ? label : "Inconnu"}</Text>
        </Link>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ededed99",
        borderRadius: 10,
        paddingTop: 15,
        width: "95%",
        height: 60,
        textAlign: "center",
    },
    label: {
        fontSize: 25,
        fontWeight: "bold",
    },
})