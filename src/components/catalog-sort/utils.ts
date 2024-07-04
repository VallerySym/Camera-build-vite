import { SortOrder, SortType } from '../../const';

export const sortByType = (sortType: SortType) => {
  switch (sortType) {
    case SortType.Price:
      return 'по цене';
    case SortType.Popular:
      return 'по популярности';
  }
};

export const sortByOrder = (sortOrder: SortOrder) => {
  switch (sortOrder) {
    case SortOrder.Up:
      return 'По возростанию';
    case SortOrder.Down:
      return 'По убыванию';
  }
};
