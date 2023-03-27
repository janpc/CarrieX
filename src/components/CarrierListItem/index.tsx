import { View, Text, Image } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../helpers/hooks";
import { weigthConverter } from "../../helpers/converters";

type Props = {
  "id": string,
}

const images = {
  Smartwatch: require('../../icons/smartwatch.png'),
  Phone: require('../../icons/smartphone.png'),
  Television: require('../../icons/laptop.png'),
  PC:require('../../icons/laptop.png'),
}

export default function CarrierListItem({id} : Props) {
  const { items } = useGlobalState();
  const [item, setItem] = useState()

  useEffect(() => {
    setItem(items[id]);
  }, [])

	return (
		<View
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Image source={images[item?.type]} />
      </View>
      <View>
        <Text style={styles.infoTitle}>{id}</Text>
        <Text style={styles.infoText}>{item?.weigth && weigthConverter(item?.weigth)}</Text>
      </View>
    </View>
	);
}
