import InfoBox from "@/components/InfoBox";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type TreeInfo = {
    adresse: string;
    libellefrancais: string;
    espece: string;
    circonferenceencm: number;
    hauteurenm: number;
}

export default function TreeScreen() {
    const { id } = useLocalSearchParams()
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
    const getTreeInfo = async () => {
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm&where=idbase%20%3D%20${id}&limit=20`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setTreeInfo(result.results[0]);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTreeInfo();
    }, [])

    return (
        <>
            <Stack.Screen options={{ title: treeInfo ? treeInfo.libellefrancais : "Loading" }} />
            <View style={styles.container}>
                {
                    treeInfo ? (
                        <>
                            <Text style={styles.title}>{treeInfo.libellefrancais}</Text>
                            <View style={styles.info}>
                                <InfoBox keyLabel={"Espèce"} valueLabel={treeInfo.espece} />
                                <View style={styles.separator} />
                                <InfoBox keyLabel={"Circonférence"} valueLabel={String(treeInfo.circonferenceencm + " cm")} />
                                <View style={styles.separator} />
                                <InfoBox keyLabel={"Hauteur"} valueLabel={String(treeInfo.hauteurenm + " m")} />
                                <View style={styles.separator} />
                                <InfoBox keyLabel={"Adresse"} valueLabel={String(treeInfo.adresse)} />
                            </View>
                        </>
                    ) : (
                        <Text>Loading...</Text>
                    )
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 40,
    },
    info: {
        alignItems: "center",
        width: "100%",
    },
    separator: {
        width: "90%",
        height: 1,
        backgroundColor: "#d5d5d5",
    },
})