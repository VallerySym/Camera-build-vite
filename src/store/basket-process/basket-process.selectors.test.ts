import { NameSpace, RequestStatus } from '../../const';
import { BasketProcess } from '../../types/state';
import { getBasketItems } from './basket-process.selectors';

const fakeState: BasketProcess = {
  items: [],
  discount: 0,
  discountPercent: 0,
  promoCode: null,
  hasError: false,
  isPromoCodeValid: false,
  basketStatus: RequestStatus.Idle,
};

let state = { [NameSpace.Basket]: fakeState };

describe('BasketProcess selectors', () => {
  beforeEach(() => {
    state = { [NameSpace.Basket]: { ...fakeState } };
  });

  it('should return "basketItems" from state', () => {
    const { items } = state[NameSpace.Basket];
    const result = getBasketItems(state);

    expect(result).toEqual(items);
  });
});
