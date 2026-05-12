import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

type Props = {
    id: number;
    label: string;
}

export default function TreeCard({ id, label }: Props) {
    return (
        <Link href={`/tree/${id}`} style={styles.card}>
            <Text style={styles.label}>{label}</Text>
        </Link>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderColor: "#25292e",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 5,
        width: 200,
        height: 50,
    },
    label: {
    },
})