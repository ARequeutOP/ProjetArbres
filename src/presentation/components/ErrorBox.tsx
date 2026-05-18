import { Colors } from "@/src/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    error: Error;
}

export default function ErrorBox({ error }: Props) {
    return (
        <View style={styles.box}>
            <Text style={styles.label}>Error: {error.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.background,
        padding: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    label: {
        fontSize: 35,
        fontWeight: "bold",
        color: Colors.textPrimary,
    },
})