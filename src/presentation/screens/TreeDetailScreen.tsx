import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../colors";
import ErrorBox from "../components/ErrorBox";
import InfoBox from "../components/InfoBox";
import { useTreeInfo } from "../hooks/useTreeInfo";

type Props = {
    id: string;
    label: string;
}

export default function TreeDetailScreen( { id, label }: Props) {
    const { treeInfo, isLoading, error } = useTreeInfo(id);

    return (
        <>
            {error ? <ErrorBox error={error}/> : <>
            <Stack.Screen options={{ title: label ?? "Tree" }} />
            <View style={styles.container}>
                {
                    isLoading || !treeInfo ? <View  style={styles.spinnerContainer}><ActivityIndicator size="large" color={Colors.textPrimary}/></View> : (
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
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
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