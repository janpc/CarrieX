import { useEffect } from 'react'
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setParcelsByDeliveryDate, setParcelsArray, setLoading, setLoaded } from '../redux/parcelsSlice'
import { getParcelsByDeliveryDate } from './api'

type dilyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number,
  "deliveryDate": string
}

export const useGlobalState = () => {
  const {
    parcelsArray,
    parcelsByDeliveryDate,
    loaded,
    loading
  } = useSelector((state: RootState) => state.reducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(setLoading(true))
      getParcelsByDeliveryDate().then(response => {
        dispatch(setParcelsByDeliveryDate(response))
      })
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


  return { parcelsByDeliveryDate, parcelsArray, loading }

}