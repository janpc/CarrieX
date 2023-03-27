import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { getIds } from '../../helpers/converters';
import { useGlobalState } from '../../helpers/hooks';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import BasePicker from '../BasePicker';
import GenericBottomModal from '../GenericBottomModal';
import styles from './styles'

type Props = {
  "visible": boolean,
  "close": any,
  "id": string,
  "navigation": any
}

export default function DeliverParcelModal({ visible, close, id, navigation}: Props) {
  const { deliverParcel } = useGlobalState();
  const [name, setName] = useState<string>('')
  const [license, setLicense] = useState<string>('')
  const [ licenseError, setLicenseError] = useState<boolean>(false)
  const [ nameError, setNameError] = useState<boolean>(false)

  useEffect(() => {
    setNameError(false)
  }, [name])

  useEffect(() => {
    setLicenseError(false)
  }, [license])

  useEffect(() => {
    if (visible) {
    }
  }, [visible])

  const handleAddParcel = () => {
    if (name === '') {
      setNameError(true)
      return
    }

    if (license === '') {
      setLicenseError(true)
      return
    }

    const correct = deliverParcel(id, name, license)
    console.log(correct);

    setName('')
    setLicense('')
    close();

    if(correct) {
      navigation.navigate('ParcelList')
    }

  }

	return (
		<GenericBottomModal
        visible={visible}
        close={close}
        title="Delivery information"
      >
        <View>
          <BaseInput
            label="Driver’s name"
            value={name}
            onChange={(value: string) => setName(value)}
            error={nameError}
          />
          <BaseInput
            label="License plate"
            value={license}
            onChange={(value: string) => setLicense(value)}
            error={licenseError}
          />
          <BaseButton text="NEXT" onClick={() => handleAddParcel()}/>
        </View>
      </GenericBottomModal>
	);
}

