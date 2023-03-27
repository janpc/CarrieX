import { useEffect, useState } from 'react';
import { Text, Image, View, } from 'react-native';
import { useGlobalState } from '../../helpers/hooks';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import BaseModal from '../BaseModal';
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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

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

  const handleDeliverParcel = () => {
    if (name === '') {
      setNameError(true)
      return
    }

    if (license === '') {
      setLicenseError(true)
      return
    }

    const correct = deliverParcel(id, name, license)

    setName('')
    setLicense('')
    close();

    if(correct) {
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }
  }

  const goToParcelList = () => {
    setShowSuccessModal(true);
    navigation.navigate('ParcelList');
  }

	return (
    <>
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
          <BaseButton text="NEXT" onClick={() => handleDeliverParcel()}/>
        </View>
      </GenericBottomModal>
      <BaseModal visible={showSuccessModal} close={()=>{}}>
        <View style={styles.modalInfo}>
          <Image source={require('../../icons/success.png')} />
          <Text style={styles.text}>Parcel successfully delivered to the carrier</Text>
          <BaseButton text="GO TO PARCEL LIST" onClick={goToParcelList}/>
        </View>
      </BaseModal>
      <BaseModal visible={showErrorModal} close={()=>{}}>
        <View style={styles.modalInfo}>
          <Image source={require('../../icons/error.png')} />
          <Text style={styles.text}>Some information is wrong</Text>
          <BaseButton text="BACK" onClick={() => {setShowErrorModal(false)}}/>
        </View>
      </BaseModal>
    </>
	);
}

