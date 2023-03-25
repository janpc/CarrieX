import {useEffect, useState} from 'react';
import { View, FlatList } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getParcelsByPickupDate } from "../../helpers/api"
import ParcelListItem from '../../components/ParcelListItem';

type Props = NativeStackScreenProps<RootStackParamList, "ParcelList", 'MyRouter'>;

type dilyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number
}

export default function ParcelList({ navigation } : Props) {
  const [ parcelsByPickupDate, setParcelsByPickupDate] = useState<dilyParcelsInfo[]>([])

  useEffect(() => {
    getParcelsByPickupDate().then((response) => {
      const responseArray: dilyParcelsInfo[] = Object.values(response)
      const responseArrayOrdered = responseArray.sort(
        (a: dilyParcelsInfo, b: dilyParcelsInfo) => {
          const DateA = new Date(a.pickupDate)
          const DateB = new Date(b.pickupDate)

          return DateA.getTime() - DateB.getTime()
        })
      setParcelsByPickupDate(responseArrayOrdered)
    })
  }, [])

	return (
		<View style={styles.container}>
      <FlatList
        data={parcelsByPickupDate}
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
