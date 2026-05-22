import { SortOrder } from '@/src/framework/query/SortOrder';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';

type Props = {
    sortOrder: SortOrder;
    updateSortOrder: () => void;
}

export default function SortBox( { sortOrder, updateSortOrder }: Props) {
    
    return (
        <Pressable onPress={updateSortOrder}>
            {
                (sortOrder === SortOrder.DESC) ?
                <AntDesign name="sort-ascending" size={30} color="black" /> :
                <AntDesign name="sort-descending" size={30} color="black" />
            }
        </Pressable>
    )
}