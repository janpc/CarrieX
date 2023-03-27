import { FlatList, View } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGlobalState } from "../../helpers/hooks";
import CarrierListItem from "../../components/CarrierListItem";
import DeliverParcelModal from "../../components/DeliverParcelModal";
import { useState } from "react";
import BaseButton from "../../components/BaseButton";

type Props = NativeStackScreenProps<RootStackParamList, "CarrierParcelList", 'MyRouter'>;

export default function CarrierParcelList( { route, navigation }: Props) {
	const { parcelsById } = useGlobalState();
	const [ visible, setVisible] = useState(false);

	return (
		<View style={styles.container}>
			<FlatList
        data={parcelsById[route.params.parcelId].items}
				keyExtractor={(item, index) => item.$oid + index}
        renderItem ={ ({item}: any) => <CarrierListItem id={item.$oid} />}
      />
			<DeliverParcelModal
				id={route.params.parcelId}
				visible={visible}
				close={() => setVisible(false)}
				navigation={navigation}
			/>
			{ !parcelsById[route.params.parcelId].delivered &&
			<View style={styles.deliveryContainer}>
        <BaseButton text="DELIVERY" onClick={() => setVisible(true)} />
      </View>
			}
		</View>
	);
}