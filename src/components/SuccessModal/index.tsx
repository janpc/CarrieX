import { View, Image, Text } from 'react-native';
import BaseButton from '../BaseButton';
import BaseModal from '../BaseModal';
import styles from './styles'

type Props = {
  "visible": boolean,
  "goToParcelList": any
}

export default function SuccessModal({visible, goToParcelList}: Props) {
	return (
		<BaseModal visible={visible} close={()=>{}}>
        <View style={styles.modalInfo}>
          <Image source={require('../../icons/success.png')} />
          <Text style={styles.text}>Parcel successfully delivered to the carrier</Text>
          <BaseButton text="GO TO PARCEL LIST" onClick={goToParcelList}/>
        </View>
      </BaseModal>
	);
}

