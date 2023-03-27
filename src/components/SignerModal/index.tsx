import SignatureScreen from "react-native-signature-canvas";
import { View, } from 'react-native';
import { useGlobalState } from '../../helpers/hooks';
import GenericBottomModal from '../GenericBottomModal';
import styles from './styles'
import BaseButton from "../BaseButton";

type Props = {
  "visible": boolean,
  "save": any,
  "close": any
}

export default function SignerModal({ visible, save, close}: Props) {

	return (
    <>
      <GenericBottomModal
        visible={visible}
        close={close}
        title="Driver’s signature"
      >
        <View>
          <SignatureScreen
            autoClear={true}
            descriptionText={'hola'}
            style={styles.signature}
          />
          <BaseButton text="SAVE" onClick={save} />
        </View>
      </GenericBottomModal>
    </>
	);
}

