import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory,  withStore} from '../../utils/mock-component';
import Tabs from './tabs';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Tabs />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});
