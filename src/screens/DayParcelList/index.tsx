import { Text, View } from "react-native";
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "DayParcelList", 'MyRouter'>;

export default function DayParcelList( { route }: Props) {
	return (
		<View style={styles.container}>
			<Text>Parcel List {route.params.day}</Text>
		</View>
	);
}