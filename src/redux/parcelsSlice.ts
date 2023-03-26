import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type dilyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number
}

interface ParcelsState {
  parcelsByDeliveryDate: {},
  parcelsArray: dilyParcelsInfo[],
  loaded: boolean,
  loading: boolean
}

const initialState: ParcelsState = {
  parcelsByDeliveryDate: {},
  parcelsArray: [],
  loaded: false,
  loading: false
}

export const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    setParcelsByDeliveryDate: (state, action: PayloadAction<{}>) => {
      state.parcelsByDeliveryDate = action.payload
    },
    setParcelsArray: (state, action: PayloadAction<[]>) => {
      state.parcelsArray = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload
      
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setParcelsByDeliveryDate, setParcelsArray, setLoaded, setLoading } = parcelsSlice.actions
export const selectParcels = (state: RootState) => state.parcels.value

export default parcelsSlice.reducer