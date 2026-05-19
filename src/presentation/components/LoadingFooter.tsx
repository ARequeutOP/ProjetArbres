import { Colors } from '@/src/core/colors';
import Entypo from '@expo/vector-icons/Entypo';
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import ErrorBox from './ErrorBox';

type Props = {
    error: unknown;
    isLoading: boolean;
    onRetry: () => void;
}

export default function LoadingFooter({ error, isLoading, onRetry }: Props) {
    if (error && !isLoading) {
        return (
            <View style={styles.container}>
                <ErrorBox error={error} />
                <Pressable onPress={onRetry}>
                    <Entypo name="cw" size={40} color={Colors.textPrimary} />
                </Pressable>
            </View>
        )
    }
    if (isLoading) {
        return <ActivityIndicator size="large" color={Colors.textPrimary} />
    }
    return (<></>)
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})