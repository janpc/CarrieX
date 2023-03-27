import { FlatList, View } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGlobalState } from "../../helpers/hooks";
import CarrierListItem from "../../components/CarrierListItem";

type Props = NativeStackScreenProps<RootStackParamList, "CarrierParcelList", 'MyRouter'>;

export default function CarrierParcelList( { route }: Props) {
	const { parcelsById } = useGlobalState();

	return (
		<View style={styles.container}>
			<FlatList
        data={parcelsById[route.params.parcelId].items}
				keyExtractor={(item, index) => item.$oid + index}
        renderItem ={ ({item}: any) => <CarrierListItem id={item.$oid} />}
      />
		</View>
	);
}