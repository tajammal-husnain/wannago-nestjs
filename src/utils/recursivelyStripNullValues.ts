const recursivelyStripNullValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValue(value));
  }
  if (value && value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValue(value),
      ]),
    );
  }
  if (value !== null) {
    return value;
  }
};
