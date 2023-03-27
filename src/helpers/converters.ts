interface Parcel {
  "id": { "$oid": string },
  "deliveryAdress": string
  "deliveryDate": string,
  "pickupAdress": string,
  "pickupDate": string,
  "itemsCount": number,
  "items": [{ "$oid": string }],
  "delivered": boolean,
  "carrier": Carrier
}

interface Carrier {
  "id":{"$oid": string},
  "companyName": string,
  "driver": string,
  "licensePlate": string,
  "centerAdress": string
}

const weigthConverter = (weight: number): string => {
  if(weight< 1000) {
    return `${weight}g`;
  }

  return `${weight/1000}kg`;
}

interface ItemWithId {
  "id": {
    $oid: string
  }
}

const getIds = (items: ItemWithId[]): string[] => {
  const ids: string[] = [];
  items.forEach(item => {
    ids.push(item.id.$oid);
  })

  return ids;
}

const formatDate = (date: Date): string => {
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  if(da[0] === '0') {
    da = da[1]
  }

  if(mo[0] === '0') {
    mo = mo[1]
  }

  return `${mo}/${da}/${ye}`;
}

const orderParcelsByDays = (parcels: Parcel[], carriers: Carrier[]): Parcel[] => {
  const parcelsByDays = {} as any;
  parcels.forEach((parcel: Parcel) => {
    if(!parcel.carrier) {
      parcel = setCarrierToParcel(parcel, carriers);
    }

    if (parcelsByDays[parcel.deliveryDate]?.carriesCount > 0) {
      parcelsByDays[parcel.deliveryDate].itemsCount += parcel.itemsCount;
      parcelsByDays[parcel.deliveryDate].carriesCount += 1;
      parcelsByDays[parcel.deliveryDate].parcels.push(parcel)
    } else {
      parcelsByDays[parcel.deliveryDate] = {
        itemsCount: parcel.itemsCount,
        deliveryDate: parcel.deliveryDate,
        pickupDate: parcel.pickupDate,
        carriesCount: 1,
        parcels: [parcel]
      };
    }
  })

  return parcelsByDays;
}

//As I have not found any relation between carriers and parcels, I assign them randomly.
const setCarrierToParcel = (parcel: Parcel, carriers: Carrier[]): Parcel => {
  const number = Math.floor(carriers.length * Math.random());
  parcel = { ...parcel, delivered: false, carrier: carriers[number]}

  return parcel
}

export { weigthConverter, getIds, formatDate, orderParcelsByDays, setCarrierToParcel };