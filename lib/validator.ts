export const isNumber = (value: any) => !isNaN(parseFloat(value)) && isFinite(value);

export const isTimestamp = (value: any) => isNumber(value) && 1000000000 < value;
