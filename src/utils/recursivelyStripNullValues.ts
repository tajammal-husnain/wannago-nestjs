const recursivelyStripNullValues = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map((item) => recursivelyStripNullValues(item));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== null) // filter out null values
        .map(([key, v]) => [key, recursivelyStripNullValues(v)]),
    );
  }
  return value;
};

export default recursivelyStripNullValues;
