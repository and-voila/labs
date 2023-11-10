import { formatPrice } from '@/app/lib/format';

export const getCoursePrice = (
  price: number,
  isPaidMember: boolean,
  purchased: boolean,
): string => {
  if (price === 0) {
    return 'Free';
  } else if (isPaidMember) {
    return 'Included';
  } else if (purchased) {
    return 'Purchased';
  } else {
    return formatPrice(price);
  }
};
