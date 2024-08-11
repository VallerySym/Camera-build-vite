import { useState } from 'react';
import BasketItem from '../../components/basket-item/basket-item';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket-process/basket-process.selectors';
import { CameraItem } from '../../types/camera-item';
import BasketSummaryOrder from '../../components/basket-summary-order/basket-summary-order';
import { calcTotalPrice } from '../../store/basket-process/utils';
import BasketEmpty from '../../components/basket-empty/basket-empty';
import { checkDeleteItemPopupOpen } from '../../store/popup-process/popup-process.selectors';
import PopupDeleteItem from '../../components/popup-delete-item/popup-delete-item';

function BasketPage(): JSX.Element {
  const basketItemList = useAppSelector(getBasketItems);
  const totalPrice = calcTotalPrice(basketItemList);
  const [camera, setCamera] = useState<CameraItem>();
  const orderIds: number[] = [];
  const isBasketEmpty = basketItemList.length === 0;
  const isDeleteItemPopupOpen = useAppSelector(checkDeleteItemPopupOpen);

  [...basketItemList].forEach((item) => {
    let i = 0;
    do {
      orderIds.push(item.id);
      i++;
    } while (i < item.count);
  });

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content" data-testid="basket-page">
          <BreadcrumbsList />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {basketItemList.length > 0 ?
                <ul className="basket__list">
                  {basketItemList.map((item) => <BasketItem key={item.id} item={item} setCamera={setCamera} />)}
                </ul> :
                <BasketEmpty />}
              <BasketSummaryOrder totalPrice={totalPrice} orderIds={orderIds} isBasketEmpty={isBasketEmpty} />
            </div>
          </section>
        </div>
        {isDeleteItemPopupOpen && <PopupDeleteItem selectedCamera={camera} />}
      </main>
      <Footer />
    </div>
  );
}

export default BasketPage;
