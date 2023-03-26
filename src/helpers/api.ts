interface parcel {
    "id": { "$oid": string },
    "deliveryAdress": string
    "deliveryDate": string,
    "pickupAdress": string,
    "pickupDate": string,
    "itemsCount": number,
    "items": [{ "$oid": string }],
    "delivered": boolean
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

const getParcelsByDeliveryDate = async () => {
  try {
    const parcels = await getAllParcels();
    const parcelsByDays = {} as any;

    parcels.forEach((parcel: parcel) => {
      parcel = { ...parcel, delivered: false }
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
  } catch (error) {
    console.error(error);
  }
}

export { getAllParcels, getParcelsByDeliveryDate }