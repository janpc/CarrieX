type parcel = {
    "id": { "$oid": string },
    "deliveryAdress": string
    "deliveryDate": string,
    "pickupAdress": string,
    "pickupDate": string,
    "itemsCount": number,
    "items": [{ "$oid": string }]
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

const getParcelsByPickupDate = async () => {
  try {
    const parcels = await getAllParcels();
    const parcelsByDays = {} as any;

    parcels.forEach((parcel: parcel) => {
      if (parcelsByDays[parcel.pickupDate]?.carriesCount > 0) {
        parcelsByDays[parcel.pickupDate].itemsCount += parcel.itemsCount;
        parcelsByDays[parcel.pickupDate].carriesCount += 1;
      } else {
        parcelsByDays[parcel.pickupDate] = {
          itemsCount: parcel.itemsCount,
          pickupDate: parcel.pickupDate,
          carriesCount: 1
        };
      }
    })

    return parcelsByDays;
  } catch (error) {
    console.error(error);
  }
}

export { getAllParcels, getParcelsByPickupDate }