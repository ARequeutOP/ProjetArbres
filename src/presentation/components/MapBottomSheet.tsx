import { Tree } from '@/src/framework/models/Tree';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView from "react-native-maps";
import { Colors } from '../colors';
import { useTreeMarkers } from '../hooks/useTreeMarkers';
import { ClusterMarker } from '../map/models/ClusterMarker';
import { Region } from '../map/models/Region';
import { ClusterMarkerImpl } from './ClusterMarker';
import { TreeMarker } from './TreeMarker';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
    treeList: Tree[];
}

export const MapBottomSheet = ({ treeList }: Props) => {
    const { markers, region, setRegion } = useTreeMarkers(treeList);
    const mapRef = useRef<MapView | null>(null);

    const zoomToCluster = (marker: ClusterMarker) => {
        const region: Region = {
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
            latitudeDelta: marker.latitudeDelta,
            longitudeDelta: marker.longitudeDelta,
        }
        mapRef.current?.animateToRegion(region);
    }

    return (
        <BottomSheet index={0} snapPoints={['1%','90%']} handleStyle={styles.handle} enableDynamicSizing={false} backgroundStyle={styles.sheetBackground}>
            <BottomSheetView style={styles.bottomSheetContent}>
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        provider="google"
                        style={styles.map}
                        initialRegion={region}
                        onRegionChangeComplete={(region)=>setRegion(region)}
                    >
                        {markers.map((marker)=>{ return (
                            marker.type === "single" ?
                            <TreeMarker key={marker.markerId} marker={marker}></TreeMarker> :
                            <ClusterMarkerImpl key={marker.markerId} marker={marker} onPress={() => zoomToCluster(marker)}></ClusterMarkerImpl>
                        )})}
                    </MapView>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    handle: {
        backgroundColor: Colors.primary,
        width: "20%",
        position: "absolute",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        bottom: 0,
        left: 50,
        height: 50,
    },
    sheetBackground: {
        backgroundColor: Colors.background,
    },
    bottomSheetContent: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    mapContainer: {
        height: WINDOW_HEIGHT*0.7,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: Colors.border,
    },
    map: {
        flex: 1,
    },
})