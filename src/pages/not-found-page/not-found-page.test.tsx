import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<NotFoundPage />);
    render(preparedComponent);

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную страницу')).toBeInTheDocument();
  });
});
