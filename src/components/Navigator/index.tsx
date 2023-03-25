import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarrierParcelList from '../../screens/CarrierParcelList';
import DayParcelList from '../../screens/DayParcelList';
import ParcelList from '../../screens/ParcelList';

const { Navigator, Screen } = createNativeStackNavigator();

export default function MyNavigator() {
  return (
    <NavigationContainer>
      <Navigator
      >
        <Screen
          name="ParcelList"
          component={ParcelList}
          options={{
            headerTitleStyle: {
              fontSize: 24,
            }
          }}
        />
        <Screen
          name="DayParcelList"
          component={DayParcelList}
          options={({ route }: any) => ({
            title: 'Parcel List ' + route.params.day,
            headerBackTitleVisible: false
          })}
        />
        <Screen
          name="CarrierParcelList"
          component={CarrierParcelList}
          options={({ route }: any) => ({
            title: route.params.carrierId + ' Parcel List',
            headerBackTitleVisible: false
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};