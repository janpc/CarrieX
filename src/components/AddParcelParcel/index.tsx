import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { getIds } from '../../helpers/converters';
import { useGlobalState } from '../../helpers/hooks';
import BaseInput from '../BaseInput';
import BasePicker from '../BasePicker';
import GenericBottomModal from '../GenericBottomModal';
import styles from './styles'

type Props = {
  "visible": boolean,
  "close": any,
}

export default function AddParcelModal({ visible, close}: Props) {
  const { carriers, addParcel } = useGlobalState();
  const [id, setId] = useState<string>('')
  const [carrierId, setCarrierId] = useState<string>('')
  const [carrierIds, setCarrierIds] = useState<string[]>([])
  const [ idError, setIdError] = useState<boolean>(false)

  useEffect(() => {
    setIdError(false)
  }, [id])

  useEffect(() => {
    const ids = getIds(carriers);
    setCarrierIds(ids)
    setCarrierId(ids[0])
  }, [carriers])

  useEffect(() => {
    if (visible) {
      setId('')
      setCarrierId(carrierIds[0])
    }
  }, [visible])

  const handleAddParcel = () => {
    if (id === '') {
      setIdError(true)
      return
    }
    addParcel(id, carrierId);
    close();
  }

	return (
		<GenericBottomModal
        visible={visible}
        close={close}
        title="Parcel and carrier information"
      >
        <View>
          <BaseInput
            label="ID"
            value={id}
            onChange={(value: string) => setId(value)}
            error={idError}
          />
          <BasePicker
            label="CarrierID"
            list={carrierIds}
            value={carrierId}
            onChange={(value: string) => setCarrierId(value)}
          />
          <TouchableOpacity
            onPress={() => handleAddParcel()}
            style={styles.addButton}
            accessibilityLabel="Add parcel and carrier information"
          >
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </GenericBottomModal>
	);
}

