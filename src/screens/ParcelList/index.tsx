import { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SvgXml } from 'react-native-svg';
import styles from "./styles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ParcelListItem from '../../components/ParcelListItem';
import { useGlobalState } from '../../helpers/hooks';
import add from "../../icons/add";
import AddParcelModal from "../../components/AddParcelParcel";

type Props = NativeStackScreenProps<RootStackParamList, "ParcelList", 'MyRouter'>;


export default function ParcelList({ navigation } : Props) {
  const { parcelsArray, loading } = useGlobalState();
  const [ modalVisible, setModalVisible ] = useState(false)

  if(loading) {
    return <Text>Loading...</Text>
  }

	return (
		<View style={styles.container}>
      <FlatList
        data={parcelsArray}
        renderItem={({item}: any) =>
          <ParcelListItem
            key={item.pickupDate}
            pickupDate={item.pickupDate}
            deliveryDate={item.deliveryDate}
            itemsCount={item.itemsCount}
            carriesCount={item.carriesCount}
            navigation={navigation}
          />}
      />
      <View style={styles.addContainer}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}>
          <SvgXml xml={add}/>
        </TouchableOpacity>
      </View>
      <AddParcelModal
        visible={modalVisible}
        close={()=>setModalVisible(false)}
      />
		</View>
	);
}
