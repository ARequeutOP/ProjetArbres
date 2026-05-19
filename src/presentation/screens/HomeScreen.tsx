import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/src/core/colors";
import BackToTop from "@/src/presentation/components/BackToTop";
import TreeCard from "@/src/presentation/components/TreeCard";
import { useTreeList } from "@/src/presentation/hooks/useTreeList";
import LoadingFooter from "../components/LoadingFooter";

export default function HomeScreen() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);
  const goBackToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }
  
  const { treeList, isLoading, loadMoreTrees, retryGetTrees, error } = useTreeList();

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
      <FlatList
        ref={flatListRef}
        data={treeList}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => String(item.idbase)}
        onEndReached={loadMoreTrees}
        onEndReachedThreshold={0.5}
        onScroll={(event)=>{
          setIsScrolled(event.nativeEvent.contentOffset.y > 200);
        }}
        ListFooterComponent={() => <LoadingFooter error={error} isLoading={isLoading} onRetry={retryGetTrees}/>}
        ListEmptyComponent={() => <Text>Aucun résultat</Text>}
        renderItem={({item})=>
          <Pressable onPress={() => openTreeDetail(item.idbase, item.libellefrancais)}>
            <TreeCard
            label={item.libellefrancais}
            espece={item.espece}
            />
          </Pressable>
        }
      />
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
})