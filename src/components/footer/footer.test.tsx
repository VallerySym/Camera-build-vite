import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const footerTestId = 'footer';

    const preparedComponent = withHistory(<Footer />);
    render(preparedComponent);

    const footerContainer = screen.getByTestId(footerTestId);

    expect(footerContainer).toBeInTheDocument();
  });
});
