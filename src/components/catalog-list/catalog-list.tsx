import CatalogItem from '../catalog-item/catalog-item';

function CatalogList(): JSX.Element {
  return (
    <div className="catalog__content">
      <div className="cards catalog__cards">
        <CatalogItem />
      </div>
    </div>
  );
}

export default CatalogList;
