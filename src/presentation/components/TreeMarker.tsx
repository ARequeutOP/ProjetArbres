import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Marker } from 'react-native-maps';
import { Colors } from "../colors";
import { SingleTreeMarker } from '../map/models/SingleTreeMarker';

type Props = {
    marker: SingleTreeMarker;
};

export const TreeMarker = ({ marker }: Props) => {
    const router = useRouter();
    const openTreeDetail = (id: string, label: string) => {
        router.push({
            pathname: "/tree-detail",
            params: {
                id: id,
                label: label,
            },
        })
    }

    return (
        <Marker
            key={marker.markerId}
            coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
            }}
            onPress={() => openTreeDetail(String(marker.treeId), marker.title)}
            >
            <View style={styles.container}>
                <Entypo name="tree" size={24} color={Colors.primary} />
            </View>
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
});