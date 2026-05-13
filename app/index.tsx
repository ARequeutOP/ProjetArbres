import BackToTop from "@/components/BackToTop";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { Colors } from "@/colors";
import TreeCard from "@/components/TreeCard";

type Tree = {
  idbase: number;
  libellefrancais: string;
  espece: string;
}

export default function Index() {
  const [treeList, setTreeList] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const flatListRef = useRef(null);
  const goBackToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }
  const getTrees = async () => {
    setIsLoading(true);
    let numberTreesLoaded = treeList.length;
    const url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais%2C%20espece&limit=20&offset=${numberTreesLoaded}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
          setIsLoading(false);
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setTreeList(prev => [...prev, ...result.results]);
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <FlatList
        ref={flatListRef}
        data={treeList}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => String(item.idbase)}
        onEndReached={()=>{if (!isLoading) getTrees()}}
        onEndReachedThreshold={0.5}
        onScroll={(event)=>{
          setIsScrolled(event.nativeEvent.contentOffset.y > 200);
        }}
        ListFooterComponent={() => isLoading ? (<Text style={styles.loadingBar}>...</Text>) : null}
        ListEmptyComponent={() => <Text>Aucun résultat</Text>}
        renderItem={({item} : {item: Tree})=><TreeCard
        id={item.idbase}
        label={item.libellefrancais}
        espece={item.espece}
        />
      } />
      {isScrolled && <BackToTop onPress={goBackToTop}/>}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 40,
    gap: 15,
  },
  loadingBar: {
    alignSelf: "center",
    fontSize: 30,
  }
})