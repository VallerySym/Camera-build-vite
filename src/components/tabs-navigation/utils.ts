import { Tab } from '../../const';

export const getTabName = (tab: Tab) => {
  switch (tab) {
    case Tab.Characteristics:
      return 'Характеристики';
    case Tab.Description:
      return 'Описание';
  }
};
