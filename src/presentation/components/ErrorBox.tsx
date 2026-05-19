import { Colors } from "@/src/core/colors";
import { getErrorMessage } from "@/src/core/utils/getErrorMessage";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    error: unknown;
}

export default function ErrorBox({ error }: Props) {
    const message = getErrorMessage(error);
    return (
        <View style={styles.box}>
            <Text style={styles.label}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.background,
        padding: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.textPrimary,
    },
})