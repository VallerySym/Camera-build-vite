import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen} from '@testing-library/react';
import {makeFakeSimilarCameras, makeFakeStore } from '../../utils/mocks';
import SimilarCamerasList from './similar-cameras-list';

describe('Component: Similar Products', () => {
  const mockSimilarProducts = makeFakeSimilarCameras();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SimilarCamerasList similarList={[...mockSimilarProducts]} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
