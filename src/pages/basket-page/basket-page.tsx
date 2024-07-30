import { useState } from 'react';
import BasketItem from '../../components/basket-item-card/basket-item-card';
import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBasketItems } from '../../store/basket-process/basket-process.selectors';
import { CameraItem } from '../../types/camera-item';
import BasketSummaryOrder from '../../components/basket-summary-order/basket-summary-order';
import { calcTotalPrice } from '../../store/basket-process/utils';
import BasketEmpty from '../../components/basket-empty/basket-empty';


function BasketPage(): JSX.Element {
  const basketItemList = useAppSelector(getBasketItems);

  const [camera, setCamera] = useState<CameraItem>();
  const [isModalActive, setModalActive] = useState(false);
  const totalPrice = calcTotalPrice(basketItemList);
  const orderIds: number[] = [];
  const [isModalBasketSuccess, setModalBasketSuccess] = useState(false);
  const isBasketEmpty = basketItemList.length === 0;

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
        <div className="page-content">
          <BreadcrumbsList />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {basketItemList.length > 0 ?
                <ul className="basket__list">
                  {basketItemList.map((item) => <BasketItem key={item.id} item={item} setCamera={setCamera} setActive={setModalActive} />)}
                </ul> :
                <BasketEmpty />}
              <BasketSummaryOrder totalPrice={totalPrice} orderIds={orderIds} setIsModalActive={setModalBasketSuccess} isBasketEmpty={isBasketEmpty} />
            </div>
          </section>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default BasketPage;
