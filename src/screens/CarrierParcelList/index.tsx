import { Text, View } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "CarrierParcelList", 'MyRouter'>;

export default function CarrierParcelList( { route }: Props) {
	return (
		<View style={styles.container}>
			<Text>{route.params.carrierId} Parcel List</Text>
		</View>
	);
}