export const calculateExpressionResult = (numberDisplay: string) => {
  try {
    const result = eval(numberDisplay).toString();

    if (result === 'Infinity') {
      return 'Error';
    }

    return result;
  } catch {
    return 'Error';
  }
};
