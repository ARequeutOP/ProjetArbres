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
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        width: "95%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    keyLabel: {
        width: "40%",
        fontSize: 16,
        fontWeight: "bold",
    },
    valueLabel: {
        fontSize: 12,
        width: "50%"
    }
})