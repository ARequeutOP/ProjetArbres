import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    onPress: () => void;
}

export default function BackToTop({ onPress }: Props) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <FontAwesome name="chevron-up" size={30} color="#fff" />
            <Text style={styles.label}>Back to top</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00000096",
        borderRadius: 25,
        width: "50%",
        height: 50,
        paddingLeft: 20,
        paddingRight: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        position: "absolute",
        top: 10,
    },
    label: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    }
})