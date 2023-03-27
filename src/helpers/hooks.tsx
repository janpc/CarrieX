import { useEffect } from 'react'
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setParcelsByDeliveryDate, setParcelsArray, setLoading, setLoaded, setParcelsById, setItems, setCarriers, setDelivered } from '../redux/parcelsSlice'
import { getParcelsById, getParcelsByDeliveryDate, getItems, getAllCarriers } from './api'
import { formatDate, orderParcelsByDays } from './converters'

type dilyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number,
  "deliveryDate": string
}

export const useGlobalState = () => {
  const {
    parcelsById,
    parcelsArray,
    parcelsByDeliveryDate,
    loaded,
    loading,
    items,
    carriers
  } = useSelector((state: RootState) => state.reducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(setLoading(true))
      const allCarriers = getAllCarriers();
      dispatch(setCarriers(allCarriers));
      getParcelsById().then(response => dispatch(setParcelsById(response)))
      getParcelsByDeliveryDate().then(response => {
        dispatch(setParcelsByDeliveryDate(response))
      })
      getItems().then(response => dispatch(setItems(response)))
      dispatch(setLoading(false))
      dispatch(setLoaded(true))
    }
  }, [])

  useEffect(() => {
    if (loaded && Object.entries(parcelsByDeliveryDate).length > 0) {
      const responseArray: dilyParcelsInfo[] = Object.values(parcelsByDeliveryDate)
      const responseArrayOrdered: dilyParcelsInfo[] = responseArray.sort(
        (a: dilyParcelsInfo, b: dilyParcelsInfo) => {
          const DateA = new Date(a.deliveryDate)
          const DateB = new Date(b.deliveryDate)

          return DateA.getTime() - DateB.getTime()
        })
        dispatch(setParcelsArray(responseArrayOrdered))
    }
  }, [loaded, parcelsByDeliveryDate])

  const addParcel = (id: string, carrierId: string) => {
    const carrier = carriers.find(c => c.id.$oid === carrierId)
    const itms = generateItems();
    const dates = generateRandomDates();

    const parcel = {
      "id": { "$oid": id },
      "deliveryAdress": 'Random address',
      "deliveryDate": formatDate(dates.delivery),
      "pickupAdress": 'Random address 2',
      "pickupDate": formatDate(dates.pickup),
      "itemsCount": itms.length,
      "items": itms,
      "delivered": false,
      "carrier": carrier
    }

    const byId = {...parcelsById};
    byId[id] = parcel;
    const byDate = {...parcelsByDeliveryDate};

    if(byDate[parcel.deliveryDate]) {
      let parcelToChange = {...byDate[parcel.deliveryDate]}
      
      parcelToChange.carriesCount = parcelToChange.carriesCount + 1;
      parcelToChange.itemsCount = parcelToChange.itemsCount + parcel.itemsCount;
      parcelToChange.parcels = [...parcelToChange.parcels, parcel];

      byDate[parcel.deliveryDate] = parcelToChange;
    } else {
      byDate[parcel.deliveryDate] = {
        carriesCount: 1,
        itemsCount: parcel.itemsCount,
        parcels: [parcel],
        deliveryDate: parcel.deliveryDate,
        pickupDate: parcel.pickupDate
      }
    }

    dispatch(setParcelsById(byId))
    dispatch(setParcelsByDeliveryDate(byDate))

  }

  const generateItems = () => {
    const num = Math.floor(Math.random() * 6) + 1;
    const itemsIds = Object.keys(items)
    const randomItems = [];

    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * itemsIds.length);
      randomItems.push({ "$oid": itemsIds[index] });
    }

    return randomItems;
  }

  const generateRandomDates = () => {
    const today = new Date();
    const delivery = new Date(today.getTime() + Math.round(Math.random() * 10) * 1000 * 60 * 60 * 24 );
    const pickup = new Date(delivery.getTime() - 2 * 1000 * 60 * 60 * 24)

    return { pickup, delivery}
  }

  const deliverParcel = ( id: string, name: string, license: string) => {
    const parcel = parcelsById[id];
    const carrier = parcel.carrier;

    console.log(carrier.driver, carrier.licensePlate);
    

    if (carrier.driver == name && carrier.licensePlate == license) {
      dispatch(setDelivered(id));
      return true;
    }

    return false
  }

  return { parcelsById, parcelsByDeliveryDate, parcelsArray, loading, items, carriers, addParcel, deliverParcel }

}