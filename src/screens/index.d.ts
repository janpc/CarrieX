declare global {
  type RootStackParamList = {
    ParcelList: undefined;
    DayParcelList: { day: string };
    CarrierParcelList: { carrierId: string };
  };
}

export interface RootStackParamList{};