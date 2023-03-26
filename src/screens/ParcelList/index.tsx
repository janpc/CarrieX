import { View, FlatList, Text } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ParcelListItem from '../../components/ParcelListItem';
import { useGlobalState } from '../../helpers/hooks';

type Props = NativeStackScreenProps<RootStackParamList, "ParcelList", 'MyRouter'>;


export default function ParcelList({ navigation } : Props) {
  const { parcelsArray, loading } = useGlobalState();

  if(loading) {
    return <Text>Loading...</Text>
  }

	return (
		<View style={styles.container}>
      <FlatList
        data={parcelsArray}
        renderItem={({item}: any) =>
          <ParcelListItem
            key={item.pickupDate}
            pickupDate={item.pickupDate}
            deliveryDate={item.deliveryDate}
            itemsCount={item.itemsCount}
            carriesCount={item.carriesCount}
            navigation={navigation}
          />}
      />
		</View>
	);
}
