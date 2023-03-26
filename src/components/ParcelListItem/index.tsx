import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

type Props = {
  "navigation": any,
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number,
  "deliveryDate": string
}

export default function ParcelListItem({navigation, itemsCount, pickupDate, deliveryDate, carriesCount } : Props) {
  const [isToday, setIsToday] = useState(false)

  useEffect(() => {
    const now = new Date()
    const datePick = new Date(pickupDate)

    if (datePick.getDate() === now.getDate() &&
      datePick.getMonth() === now.getMonth() &&
      datePick.getFullYear() === now.getFullYear()) {
        setIsToday(true);
      }

  }, [pickupDate])
  
	return (
		<TouchableOpacity
      onPress={() =>
        navigation.navigate('DayParcelList', {day: deliveryDate})
      }
      style={styles.container}
    >
      <View>
        <Text style={styles.infoTitle}>Parcel list {deliveryDate}</Text>
        <Text style={styles.infoText} >{carriesCount} carriers will pick up the parcel {isToday ? 'today' : pickupDate }</Text>
        <Text style={styles.infoText} >{itemsCount} items</Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.dateText}>{deliveryDate}</Text>
      </View>
    </TouchableOpacity>
	);
}
