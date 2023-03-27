import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";

type Props = {
  "navigation": any,
  "itemsCount": number,
  "id": string,
  "delivered": boolean,
  "companyName": string
}

export default function DayListItem({navigation, itemsCount, id, companyName, delivered } : Props) {

	return (
		<TouchableOpacity
      onPress={() =>
        navigation.navigate('CarrierParcelList', {parcelId: id})
      }
      style={styles.container}
    >
      <View style={styles.truckContainer}>
        <Image source={require('../../icons/cargo-truck.png')} />
      </View>
      <View>
        <Text style={styles.infoTitle}>{id} Parcel List </Text>
        <Text style={styles.infoText}>{companyName}</Text>
        <Text style={styles.infoText} >{itemsCount} items to be picked up</Text>
      </View>
      <View style={styles.deliveryContainer}>
        { delivered ?
          <Text style={styles.delivered}>DELIVERED</Text> :
          <Text style={styles.delivery}>DELIVERY</Text> }
      </View>
    </TouchableOpacity>
	);
}
