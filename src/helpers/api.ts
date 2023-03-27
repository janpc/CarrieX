import  carriers from '../json/carriers';
import { orderParcelsByDays, setCarrierToParcel } from './converters';
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

interface Item {
  "id": {"$oid": string},
  "type": string,
  "model": string,
  "price": number,
  "weigth": number
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

const getAllCarriers = () => {
  return carriers;
};

const getParcelsByDeliveryDate = async () => {
  try {
    const parcels = await getAllParcels();
    const orderedParcels = orderParcelsByDays(parcels, carriers);
    return orderedParcels;
  } catch (error) {
    console.error(error);
  }
}

const getParcelsById = async () => {
  try {
    const parcels = await getAllParcels();
    const orderedParcels = orderParcelsById(parcels);
    return orderedParcels;
  } catch (error) {
    console.error(error);
  }
}

const getItems = async () => {
  try {
    const response = await fetch(
      'https://challenges-asset-files.s3.us-east-2.amazonaws.com/Events/Media+Markt/Challenges/items_mm.json',
    );
    const items = await response.json();

    const orderedItems = orderItemsById(items)
    return orderedItems;
  } catch (error) {
    console.error(error);
  }
}



const orderParcelsById = (parcels: Parcel[]): Parcel[] => {
  const parcelsById = {} as any;
  parcels.forEach((parcel: Parcel) => {
    parcel = setCarrierToParcel(parcel, carriers);
    parcelsById[parcel.id.$oid] = parcel
  })

  return parcelsById;
}



const orderItemsById = (items: Item[]): Item[] => {
  const itemsById = {} as any;
  items.forEach((item: Item) => {
    itemsById[item.id.$oid] = item
  })

  return itemsById;
}

export { getParcelsByDeliveryDate, getAllCarriers, getParcelsById, getItems }