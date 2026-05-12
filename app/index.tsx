import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TreeCard from "@/components/TreeCard";

type Tree = {
  idbase: number;
  libellefrancais: string;
}

export default function Index() {
  const [treeList, setTreeList] = useState<Tree[]>([])
  const getTrees = async () => {
    const url = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/records?select=idbase%2C%20libellefrancais&limit=20";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setTreeList(result.results);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getTrees();
  },[])
  
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {treeList.map((tree)=>{
            return (
              <TreeCard
              key={tree.idbase}
              id={tree.idbase}
              label={tree.libellefrancais}
              />
            )})}
          </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    gap: 10,
  },
})