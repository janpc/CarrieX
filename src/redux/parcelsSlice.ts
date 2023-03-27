import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type dailyParcelsInfo = {
  "itemsCount": number,
  "pickupDate": string,
  "carriesCount": number
}

interface ParcelsState {
  parcelsById: {},
  parcelsByDeliveryDate: {},
  parcelsArray: dailyParcelsInfo[],
  items: [],
  loaded: boolean,
  loading: boolean
}

const initialState: ParcelsState = {
  parcelsById: {},
  parcelsByDeliveryDate: {},
  parcelsArray: [],
  items: [],
  loaded: false,
  loading: false
}

export const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    setParcelsById: (state, action: PayloadAction<{}>) => {
      state.parcelsById = action.payload
    },
    setParcelsByDeliveryDate: (state, action: PayloadAction<{}>) => {
      state.parcelsByDeliveryDate = action.payload
    },
    setParcelsArray: (state, action: PayloadAction<[]>) => {
      state.parcelsArray = action.payload
    },
    setItems: (state, action: PayloadAction<[]>) => {
      state.items = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload
      
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setParcelsById, setParcelsByDeliveryDate, setParcelsArray, setLoaded, setLoading, setItems } = parcelsSlice.actions
export const selectParcels = (state: RootState) => state.parcels.value

export default parcelsSlice.reducer