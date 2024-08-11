import { DiscountPercent, ProductQntDiscountRange, OrderSummRange} from '../../const';

export const getDiscountByQuantity = (totalQuantity: number): number => {
  if (totalQuantity <= ProductQntDiscountRange.OneProduct) {
    return DiscountPercent.ZeroPercent;
  } else if (totalQuantity === ProductQntDiscountRange.TwoProducts) {
    return DiscountPercent.ThreePercents;
  } else if (totalQuantity >= ProductQntDiscountRange.ThreeProducts && totalQuantity <= ProductQntDiscountRange.FiveProducts) {
    return DiscountPercent.FivePercents;
  } else if (totalQuantity >= ProductQntDiscountRange.SixProducts && totalQuantity <= ProductQntDiscountRange.TenProducts) {
    return DiscountPercent.TenPercents;
  } else if (totalQuantity > ProductQntDiscountRange.TenProducts) {
    return DiscountPercent.FifteenPercents;
  }
  return DiscountPercent.ZeroPercent;
};

export const getDiscountByTotalPrice = (totalPrice: number, discountPercent: number): number => {
  if (totalPrice >= OrderSummRange.TenThousand && totalPrice < OrderSummRange.TwentyThousand) {
    return discountPercent - DiscountPercent.OnePercent;
  } else if (totalPrice >= OrderSummRange.TwentyThousand && totalPrice < OrderSummRange.ThirtyThousand) {
    return discountPercent - DiscountPercent.TwoPercents;
  } else if (totalPrice >= OrderSummRange.ThirtyThousand) {
    return discountPercent - DiscountPercent.ThreePercents;
  }
  return discountPercent;
};
