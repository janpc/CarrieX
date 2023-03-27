import { Text, TouchableOpacity } from 'react-native';
import styles from './styles'

type Props = {
  "text": string,
  "onClick": any,
}

export default function BaseButton({ text, onClick }: Props) {
	return (
		<TouchableOpacity
      onPress={() => onClick()}
      style={styles.button}
      accessibilityLabel="Add parcel and carrier information"
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
	);
}

