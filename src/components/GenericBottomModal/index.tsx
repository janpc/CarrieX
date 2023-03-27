import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './styles'

type Props = {
  "title": string
  "visible": boolean,
  "close": any,
  "children": JSX.Element,
}

export default function GenericBottomModal({title, visible, close, children}: Props) {
	return (
		<Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={close}>
      <TouchableOpacity style={styles.container} onPress={close}/>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        {children}
      </View>
    </Modal>
	);
}

