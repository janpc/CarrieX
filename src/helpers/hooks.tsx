import { useEffect } from 'react'
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setParcelsByDeliveryDate, setParcelsArray, setLoading, setLoaded, setParcelsById, setItems } from '../redux/parcelsSlice'
import { getParcelsById, getParcelsByDeliveryDate, getItems } from './api'

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
    items
  } = useSelector((state: RootState) => state.reducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(setLoading(true))
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


  return { parcelsById, parcelsByDeliveryDate, parcelsArray, loading, items }

}