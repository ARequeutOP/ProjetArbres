import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Colors } from "@/src/colors";
import ErrorBox from "@/src/presentation/components/ErrorBox";
import InfoBox from "@/src/presentation/components/InfoBox";
import { useTreeInfo } from "@/src/presentation/hooks/useTreeInfo";

export default function TreeScreen() {
    const { id, label } = useLocalSearchParams<{ id: string; label: string }>()
    const { treeInfo, isLoading, error } = useTreeInfo(id);

    return (
        <>
            {error ? <ErrorBox error={error}/> : <>
            <Stack.Screen options={{ title: label ?? "Tree" }} />
            <View style={styles.container}>
                {
                    isLoading || !treeInfo ? <Text>Loading...</Text> : (
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
                    )
                }
            </View></>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        color: Colors.textPrimary,
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
        backgroundColor: Colors.border,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    mapContainer: {
        marginTop: 20,
        width: "95%",
        height: "55%",
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 20,
        overflow: "hidden"
    }
})