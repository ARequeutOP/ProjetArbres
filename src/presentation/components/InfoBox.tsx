import { Colors } from "@/src/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    keyLabel: string;
    valueLabel: string;
}

export default function TreeCard({ keyLabel, valueLabel }: Props) {
    return (
        <View style={styles.box}>
            <Text style={styles.keyLabel}>{keyLabel}</Text>
            <Text style={styles.valueLabel}>{valueLabel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.background,
        padding: 10,
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    keyLabel: {
        width: "40%",
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.textPrimary,
    },
    valueLabel: {
        fontSize: 14,
        width: "50%",
        color: Colors.textPrimary,
    }
})