import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeCameras, makeFakeStore } from '../../utils/mocks';
import CatalogList from './catalog-list';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: CatalogList', () => {
  it('should render correctly', () => {
    const mockCameras = makeFakeCameras();
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <CatalogList catalogList={mockCameras}  />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-list')).toBeInTheDocument();
    
  });
});
