import { View, Modal, TouchableOpacity } from 'react-native';
import styles from './styles'

type Props = {
  "visible": boolean,
  "close": any,
  "children": JSX.Element,
}

export default function BaseModal({visible, close, children}: Props) {
	return (
		<Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={close}>
      <TouchableOpacity style={styles.container} onPress={close} />
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {children}
          </View>
        </View>
    </Modal>
	);
}

