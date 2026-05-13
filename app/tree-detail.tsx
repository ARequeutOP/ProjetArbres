import InfoBox from "@/components/InfoBox";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type TreeInfo = {
    adresse: string;
    libellefrancais: string;
    espece: string;
    circonferenceencm: number;
    hauteurenm: number;
    stadedeveloppement: string;
    geo_point_2d: {
        lon: number,
        lat: number
        }
}

export default function TreeScreen() {
    const { id, label } = useLocalSearchParams<{ id: string; label: string }>()
    const [treeInfo, setTreeInfo] = useState<TreeInfo | null>(null)
    const getTreeInfo = async () => {
        const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=libellefrancais%2C%20adresse%2C%20espece%2C%20circonferenceencm%2C%20hauteurenm%2C%20stadedeveloppement%2C%20geo_point_2d&where=idbase%20%3D%20${id}&limit=20`;
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
            <Stack.Screen options={{ title: label }} />
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
                                {treeInfo.stadedeveloppement ? <><InfoBox keyLabel={"Stade de développement"} valueLabel={treeInfo.stadedeveloppement} />
                                <View style={styles.separator} /></> : <></>}
                                <InfoBox keyLabel={"Adresse"} valueLabel={String(treeInfo.adresse)} />
                                <View style={styles.mapContainer}>
                                    <MapView
                                        provider="google"
                                        style={styles.map}
                                        region={{
                                            latitude: treeInfo.geo_point_2d.lat,
                                            longitude: treeInfo.geo_point_2d.lon,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05,
                                        }}>
                                        <Marker
                                            coordinate={{
                                                latitude: treeInfo.geo_point_2d.lat,
                                                longitude: treeInfo.geo_point_2d.lon}}
                                                />
                                    </MapView>
                                </View>
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
    map: {
        width: "100%",
        height: "100%",
    },
    mapContainer: {
        marginTop: 20,
        width: "95%",
        height: "55%",
        borderColor: "#6c6b6b",
        borderWidth: 2,
        borderRadius: 20,
        overflow: "hidden"
    }
})