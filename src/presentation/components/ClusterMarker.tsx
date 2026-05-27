import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { Colors } from "../colors";
import { ClusterMarker } from "../map/models/ClusterMarker";

type Props = {
    marker: ClusterMarker;
    onPress: ()=>void;
};

export const ClusterMarkerImpl = ({ marker, onPress }: Props) => {
    
    return (
        <Marker
            coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
            }}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Text style={styles.text}>
                    {marker.treeIds.length}
                </Text>
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: 40,
        height: 40,
        paddingHorizontal: 8,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Colors.background,
        fontWeight: "bold",
        fontSize: 14,
    },
});