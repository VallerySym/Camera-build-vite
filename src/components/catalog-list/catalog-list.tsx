import CatalogItem from '../catalog-item/catalog-item';
import { CameraItem } from '../../types/camera-item';

type CatalogListProps = {
  catalogList: CameraItem[];
}

function CatalogList({ catalogList }: CatalogListProps): JSX.Element {
  return (
    <div className="catalog__content" data-testid="catalog-list">
      <div className="cards catalog__cards">
        {catalogList.map((camera) => {
          const keyValue = camera.id;
          return (
            <CatalogItem key={keyValue} catalogItem={camera} />
          );
        })}
      </div>
    </div>
  );
}

export default CatalogList;
