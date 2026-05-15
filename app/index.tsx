import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import BackToTop from "@/components/BackToTop";
import TreeCard from "@/components/TreeCard";
import { useTreeList } from "@/hooks/useTreeList";
import { Colors } from "@/model/colors";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);
  const goBackToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }
  
  const { treeList, isLoading, getTrees } = useTreeList();

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <FlatList
        ref={flatListRef}
        data={treeList}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => String(item.idbase)}
        onEndReached={()=>{getTrees()}}
        onEndReachedThreshold={0.5}
        onScroll={(event)=>{
          setIsScrolled(event.nativeEvent.contentOffset.y > 200);
        }}
        ListFooterComponent={() => isLoading ? (<Text style={styles.loadingBar}>...</Text>) : null}
        ListEmptyComponent={() => <Text>Aucun résultat</Text>}
        renderItem={({item})=><TreeCard
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