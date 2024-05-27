import { render, screen } from '@testing-library/react';
import Header from './header';
import { withHistory } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });
});
