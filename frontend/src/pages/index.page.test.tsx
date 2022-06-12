import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Home from './index.page';
import { act } from 'react-dom/test-utils';

expect.extend(toHaveNoViolations);

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  test('home page has no axe violations', async () => {
    const { container } = render(<Home />);
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
