declare global {
  type RootStackParamList = {
    ParcelList: undefined;
    DayParcelList: { day: string };
    CarrierParcelList: { parcelId: string };
  };
}

export interface RootStackParamList{};