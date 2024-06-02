import cn from 'classnames';
import { useState } from 'react';
import { Tab } from '../../const';
import TabsNavigation from '../tabs-navigation/tabs-navigation';
import { CameraItem } from '../../types/camera-item';

type TabsProps = {
  selectedCamera: CameraItem | null;
};

function Tabs({selectedCamera}:TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Description);

  return (
    <>
      <TabsNavigation
        camera={selectedCamera}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="tabs__content" data-testid="tabs">
        <div
          className={cn('tabs__element', {
            'is-active': activeTab === Tab.Characteristics,
          })}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>{' '}
              <p className="item-list__text">{selectedCamera?.vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{selectedCamera?.category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{selectedCamera?.type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{selectedCamera?.level}</p>
            </li>
          </ul>
        </div>
        <div
          className={cn('tabs__element', {
            'is-active': activeTab === Tab.Description,
          })}
        >
          <div className="product__tabs-text">
            <p>{selectedCamera?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabs;
