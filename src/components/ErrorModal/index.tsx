import { View, Image, Text } from 'react-native';
import BaseButton from '../BaseButton';
import BaseModal from '../BaseModal';
import styles from './styles'

type Props = {
  "visible": boolean,
  "close": any
}

export default function ErrorModal({visible, close}: Props) {
	return (
		<BaseModal visible={visible} close={() => { } }  >
      <View style={styles.modalInfo}>
        <Image source={require('../../icons/error.png')} />
        <Text style={styles.text}>Some information is wrong</Text>
        <BaseButton text="BACK" onClick={close} />
      </View>
    </BaseModal>
	);
}

