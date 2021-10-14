import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import { Router, useParams } from 'react-router-dom';
import history from 'util/history';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { productResponse, server } from './fixtures';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('should show toast and redirect when submit from correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />;
      </Router>
    );
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    const categoriesInput = screen.getByLabelText('Categorias');
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletronicos', 'Computadores']);

    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/16-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computador Mto bom');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });

  test('should show 5 validation messages just clicking submit', async () => {
    render(
      <Router history={history}>
        <Form />;
      </Router>
    );
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo Obrigatório!');
      expect(messages).toHaveLength(5);
    });
  });

  test('should clear validation messages when filling out the form correctly', async () => {
    render(
      <Router history={history}>
        <Form />;
      </Router>
    );
    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo Obrigatório!');
      expect(messages).toHaveLength(5);
    });

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');

    const categoriesInput = screen.getByLabelText('Categorias');
    await selectEvent.select(categoriesInput, ['Eletronicos', 'Computadores']);

    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/16-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computador Mto bom');

    await waitFor(() => {
      const messages = screen.queryAllByText('Campo Obrigatório!');
      expect(messages).toHaveLength(0);
    });
  });
});

describe('Product form update tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: '1',
    });
  });

  test('should show toast and redirect when submit from correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />;
      </Router>
    );
    await waitFor(() => {
      const nameInput = screen.getByTestId('name');
      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const formElement = screen.getByTestId("form");
      // const categoriesInput = screen.getByLabelText('Categorias');

      expect(nameInput).toHaveValue(productResponse.name);
      expect(priceInput).toHaveValue(String(productResponse.price));
      expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
      expect(descriptionInput).toHaveValue(productResponse.description);

      const ids = productResponse.categories.map(x => String(x.id));
      expect(formElement).toHaveFormValues({categories : ids});
    });

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    userEvent.click(submitButton);
    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso');
      expect(toastElement).toBeInTheDocument();
    });
    expect(history.location.pathname).toEqual('/admin/products');

    
    // // await selectEvent.select(categoriesInput, ['Eletronicos', 'Computadores']);

    // userEvent.type(nameInput, 'Computador');
    // userEvent.type(priceInput, '5000.12');
    // userEvent.type(
    //   imgUrlInput,
    //   'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/16-big.jpg'
    // );
    // userEvent.type(descriptionInput, 'Computador Mto bom');

    // userEvent.click(submitButton);

    // await waitFor(() => {
    //   const toastElement = screen.getByText('Produto cadastrado com sucesso');
    //   expect(toastElement).toBeInTheDocument();
    // });

    // expect(history.location.pathname).toEqual('/admin/products');
  });
});
