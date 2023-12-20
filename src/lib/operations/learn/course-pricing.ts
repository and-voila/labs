export const getCoursePrice = (
  price: number,
  isPaidMember: boolean,
): string => {
  if (price === 0) {
    return 'Free';
  } else if (isPaidMember) {
    return 'Included';
  } else {
    return 'Premium';
  }
};
