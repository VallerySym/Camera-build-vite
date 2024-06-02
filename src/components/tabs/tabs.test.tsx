import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamera } from '../../utils/mocks';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();

    const { withStoreComponent } = withStore(<Tabs selectedCamera={mockCamera} />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});
