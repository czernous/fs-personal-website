import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import Button from './index';
import { act } from 'react-dom/test-utils';
import { Color, Size } from '../../../enums';

expect.extend(toHaveNoViolations);

describe('Primary Button', () => {
  let primaryButton;

  beforeEach(() => {
    act(() => {
      primaryButton = render(
        <Button
          buttonColor={Color.Danger}
          buttonSize={Size.Small}
          buttonType={'button'}
          buttonStyle={'primary'}
          buttonText={'Primary CTA'}
          buttonFullWidth={false}
          hasShadow={false}
        />,
      );
    });
  });

  test('passes axe audit', async () => {
    const { container } = primaryButton;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('renders Primary Button', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Primary CTA');
  });
});

describe('Primary Link Button with correct text', () => {
  let primaryButton;

  beforeEach(() => {
    act(() => {
      primaryButton = render(
        <Button
          buttonColor={Color.Brick}
          buttonSize={Size.Regular}
          buttonHref={'www.google.com'}
          buttonType={'button'}
          buttonStyle={'primary'}
          buttonText={'CTA Link'}
          buttonTarget={'_blank'}
          buttonFullWidth={true}
          hasShadow={true}
        />,
      );
    });
  });

  test('passes axe audit', async () => {
    const { container } = primaryButton;
    await act(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('renders Primary Link Button with correct href', () => {
    const button = screen.getByText('CTA Link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'www.google.com');
  });
});
