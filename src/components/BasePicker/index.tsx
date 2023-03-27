import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import styles from './styles'

type Props = {
  "label": string,
  "value": string,
  "onChange": any,
  "list": string[]
}

export default function BasePicker({ label, value, onChange, list }: Props) {
	return (
		<View style={{}}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Picker
        selectedValue={value}
        style={styles.inputStyle}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
      >
        {list.map(item => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>
    </View>
	);
}

