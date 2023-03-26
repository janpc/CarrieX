import { Text, View, FlatList } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGlobalState } from '../../helpers/hooks';
import ParcelListItem from "../../components/ParcelListItem";

type Props = NativeStackScreenProps<RootStackParamList, "DayParcelList", 'MyRouter'>;

export default function DayParcelList( { route, navigation }: Props) {
	const { parcelsByDeliveryDate, loading } = useGlobalState();

	return (
		<View style={styles.container}>
			<FlatList
        data={parcelsByDeliveryDate[route.params.day].parcels}
        renderItem={({item}: any) =>
					<ParcelListItem
						key={item.pickupDate}
						pickupDate={item.pickupDate}
						itemsCount={item.itemsCount}
						carriesCount={item.carriesCount}
						navigation={navigation}
					/>}
      />
		</View>
	);
}