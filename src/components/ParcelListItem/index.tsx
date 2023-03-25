import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

type Props = {
  "navigation": any,
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number
}

export default function ParcelListItem({navigation, itemsCount, pickupDate, carriesCount } : Props) {
	return (
		<TouchableOpacity
      onPress={() =>
        navigation.navigate('DayParcelList', {day: pickupDate})
      }
      style={styles.container}
    >
      <View>
        <Text style={styles.infoTitle}>Parcel list {pickupDate}</Text>
        <Text style={styles.infoText} >{carriesCount} carriers will pick up the parcel today</Text>
        <Text style={styles.infoText} >{itemsCount} items</Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>{pickupDate}</Text>
      </View>
    </TouchableOpacity>
	);
}
