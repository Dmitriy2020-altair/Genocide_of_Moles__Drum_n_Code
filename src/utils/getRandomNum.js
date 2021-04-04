function getRandomNum(min, max, isInteger = true) {
  const random = Math.random() * (max - min) + min;

  return (isInteger) ? Math.floor(random) : random;
}

export default getRandomNum;
