import { Text, View, Button } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "ParcelList", 'MyRouter'>;

export default function ParcelList({ navigation } : Props) {
	return (
		<View style={styles.container}>
      <Button
        title="DayParcelList"
        onPress={() =>
          navigation.navigate('DayParcelList', {day: 'today'})
        }
      />
      <Button
        title="CarrierParcelList"
        onPress={() =>
          navigation.navigate('CarrierParcelList', { carrierId: 'today' })
        }
      />
		</View>
	);
}