import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/src/core/colors";
import BackToTop from "@/src/presentation/components/BackToTop";
import ErrorBox from "@/src/presentation/components/ErrorBox";
import TreeCard from "@/src/presentation/components/TreeCard";
import { useTreeList } from "@/src/presentation/hooks/useTreeList";

export default function HomeScreen() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);
  const goBackToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }
  
  const { treeList, isLoading, getTrees, error } = useTreeList();

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
    <>
      {error ? <ErrorBox error={error}/> :
      <FlatList
        ref={flatListRef}
        data={treeList}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => String(item.idbase)}
        onEndReached={getTrees}
        onEndReachedThreshold={0.5}
        onScroll={(event)=>{
          setIsScrolled(event.nativeEvent.contentOffset.y > 200);
        }}
        ListFooterComponent={() => isLoading ? (<Text style={styles.loadingBar}>...</Text>) : null}
        ListEmptyComponent={() => <Text>Aucun résultat</Text>}
        renderItem={({item})=>
          <Pressable onPress={() => openTreeDetail(item.idbase, item.libellefrancais)}>
            <TreeCard
            label={item.libellefrancais}
            espece={item.espece}
            />
          </Pressable>
        }
      />}
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