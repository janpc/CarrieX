const weigthConverter = (weight: number): string => {
  if(weight< 1000) {
    return `${weight}g`;
  }

  return `${weight/1000}kg`;
}

export { weigthConverter };