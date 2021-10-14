import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';

test('ButtonIcon should render button with gver text', () => {
  const text = 'Fazer Login';
  render(<ButtonIcon text={text} />);

  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.getByTestId("arrow")).toBeInTheDocument();
});
