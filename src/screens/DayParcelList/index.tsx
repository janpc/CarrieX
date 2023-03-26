import { Text, View, FlatList } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGlobalState } from '../../helpers/hooks';
import DayListItem from "../../components/DayListItem";
import { useEffect, useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "DayParcelList", 'MyRouter'>;

interface parcel {
	"id": { "$oid": string },
	"itemsCount": number,
	"parcels": [{ "$oid": string }],
}

export default function DayParcelList( { route, navigation }: Props) {
	const { parcelsByDeliveryDate } = useGlobalState();
	const [day, setDay] = useState<parcel | undefined>(undefined);

	useEffect(() => {
		setDay(parcelsByDeliveryDate[route.params.day]);
	}, [])
	

	return (
		<View style={styles.container}>
			<Text style={styles.totalItems} >{day?.itemsCount} items to be picked up</Text>
			<FlatList
        data={day?.parcels}
				keyExtractor={item => item.id.$oid}
        renderItem={({item}: any) =>
					<DayListItem
						id={item.id.$oid}
						itemsCount={item.itemsCount}
						companyName={item.carrier.companyName}
						delivered={item.delivered}
						navigation={navigation}
					/>}
      />
		</View>
	);
}