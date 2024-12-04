export const calculateExpressionResult = (numberDisplay: string) => {
  try {
    const result = eval(numberDisplay).toString();

    if (result === 'Infinity' || isNaN(Number(result))) {
      return 'Error';
    }

    return result;
  } catch {
    return 'Error';
  }
};
