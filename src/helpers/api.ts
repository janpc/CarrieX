import  carriers from '../json/carriers';
//I take the local data because the json of the link you gave us was broken.

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

const getAllParcels = async () => {
  try {
    const response = await fetch(
      'https://challenges-asset-files.s3.us-east-2.amazonaws.com/Events/Media+Markt/Challenges/parcels_mm.json',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getAllCarriers = async () => {
  return carriers;
};

const getParcelsByDeliveryDate = async () => {
  try {
    const parcels = await getAllParcels();
    const orderedParcels = orderParcelsByDays(parcels);
    return orderedParcels;
  } catch (error) {
    console.error(error);
  }
}

const orderParcelsByDays = (parcels: Parcel[]): Parcel[] => {
  const parcelsByDays = {} as any;
    parcels.forEach((parcel: Parcel) => {
      parcel = setCarrierToParcel(parcel);
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
const setCarrierToParcel = (parcel: Parcel): Parcel => {
  const number = Math.floor(carriers.length * Math.random());
  parcel = { ...parcel, delivered: false, carrier: carriers[number]}

  return parcel
}

export { getAllParcels, getParcelsByDeliveryDate, getAllCarriers }