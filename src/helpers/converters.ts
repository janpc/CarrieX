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

export { weigthConverter, getIds, formatDate };