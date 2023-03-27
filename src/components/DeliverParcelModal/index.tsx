import { useEffect, useState } from 'react';
import { View, } from 'react-native';
import { useGlobalState } from '../../helpers/hooks';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import ErrorModal from '../ErrorModal';
import GenericBottomModal from '../GenericBottomModal';
import SignerModal from '../SignerModal';
import SuccessModal from '../SuccessModal';

type Props = {
  "visible": boolean,
  "close": any,
  "id": string,
  "navigation": any
}

export default function DeliverParcelModal({ visible, close, id, navigation}: Props) {
  const { deliverParcel, isDriverInfoCorrect } = useGlobalState();
  const [name, setName] = useState<string>('')
  const [license, setLicense] = useState<string>('')
  const [ licenseError, setLicenseError] = useState<boolean>(false)
  const [ nameError, setNameError] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSignatureModal, setShowSignatureModal] = useState<boolean>(false)

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

    const correct = isDriverInfoCorrect(id, name, license)

    setName('')
    setLicense('')
    close();

    if(correct) {
      setShowSignatureModal(true);
    } else {
      setShowErrorModal(true);
    }
  }

  const handleSucces= () => {
    setShowSignatureModal(false);
    deliverParcel(id)
    setShowSuccessModal(true);
  }

  const handleError= () => {
    setShowSignatureModal(false);
    setShowErrorModal(true);
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
            error={nameError} />
          <BaseInput
            label="License plate"
            value={license}
            onChange={(value: string) => setLicense(value)}
            error={licenseError} />
          <BaseButton text="NEXT" onClick={() => handleDeliverParcel()} />
        </View>
      </GenericBottomModal>
      <SuccessModal
        visible={showSuccessModal}
        goToParcelList={() => navigation.navigate('ParcelList')}
      />
      <ErrorModal
        visible={showErrorModal}
        close={() => { setShowErrorModal(false); }}
      />
      <SignerModal
        visible={showSignatureModal}
        save={ handleSucces }
        close = {handleError}
      />
    </>
	);
}

