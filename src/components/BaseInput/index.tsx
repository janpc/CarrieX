import { Text, View, TextInput } from 'react-native';
import styles from './styles'

type Props = {
  "label": string,
  "value": string,
  "onChange": any,
  "error": boolean,
}

export default function BaseInput({ label, value, onChange, error }: Props) {
	return (
		<View style={{}}>
      <Text style={error? [styles.labelStyle, styles.error] : styles.labelStyle}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        style={error? [styles.inputStyle, styles.error] : styles.inputStyle}
      />
    </View>
	);
}

