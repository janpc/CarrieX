import { useEffect } from 'react'
import type { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setParcelsByPickupDate, setParcelsArray, setLoading, setLoaded } from '../redux/parcelsSlice'
import { getParcelsByPickupDate } from './api'

type dilyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number
}

export const useGlobalState = () => {
  const {
    parcelsArray,
    parcelsByPickupDate,
    loaded,
    loading
  } = useSelector((state: RootState) => state.reducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(setLoading(true))
      getParcelsByPickupDate().then(response => {
        dispatch(setParcelsByPickupDate(response))
      })
      dispatch(setLoading(false))
      dispatch(setLoaded(true))
    }
  }, [])

  useEffect(() => {
    if (loaded && Object.entries(parcelsByPickupDate).length > 0) {
      const responseArray: dilyParcelsInfo[] = Object.values(parcelsByPickupDate)
      const responseArrayOrdered: dilyParcelsInfo[] = responseArray.sort(
        (a: dilyParcelsInfo, b: dilyParcelsInfo) => {
          const DateA = new Date(a.pickupDate)
          const DateB = new Date(b.pickupDate)

          return DateA.getTime() - DateB.getTime()
        })
        dispatch(setParcelsArray(responseArrayOrdered))
    }
  }, [loaded, parcelsByPickupDate])


  return { parcelsByPickupDate, parcelsArray, loading }

}