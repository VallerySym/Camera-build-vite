import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen} from '@testing-library/react';
import {makeFakeSimilarCameras, makeFakeStore } from '../../utils/mocks';
import SimilarCamera from './similar-camera';

describe('Component: Similar Card', () => {
  const mockSimilarProduct = makeFakeSimilarCameras()[0];
  const mockStore = makeFakeStore();

  it('should render correctly', () => {

    const {withStoreComponent} = withStore(
      <SimilarCamera similarCamera={{...mockSimilarProduct}} style={{width: '100%', margin: 0}} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockSimilarProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText(`Фотоаппарат ${mockSimilarProduct.name}`)).toBeInTheDocument();
  });
});
