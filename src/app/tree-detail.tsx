import { useLocalSearchParams } from "expo-router";

import TreeDetailScreen from "../presentation/screens/TreeDetailScreen";

export default function TreeScreen() {
    const { id, label } = useLocalSearchParams<{ id: string; label: string }>();

    return (
        <TreeDetailScreen id={id} label={label}></TreeDetailScreen>
    )
}