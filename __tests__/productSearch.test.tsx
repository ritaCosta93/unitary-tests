import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductSearch from "../components/productSearch";

describe('Product Search test',() => {

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('search field should render', () => {
    render(<ProductSearch/>)
    expect( screen.getByPlaceholderText(/search products/i)).toBeInTheDocument()
  })

  it('search button should render', () => {
    render(<ProductSearch/>)
    expect( screen.getByRole('button',{name:/search/i})).toBeInTheDocument()
  })

  it('search for product', async () => {

    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['shoes']),
      })
    );
    render(<ProductSearch/>)
    const searchBtn = screen.getByRole('button',{name:/search/i})
    const searchInput = screen.getByPlaceholderText(/search products/i)
    const query = 'shoes'
    await userEvent.type(searchInput,query);
    await userEvent.click(searchBtn);

    expect((globalThis as any).fetch).toHaveBeenCalledWith(`/api/products?q=${query}`);

  })

  it('shows loading while fetching', async () => {

    (globalThis as any).fetch = jest.fn(() =>
      new Promise (() => {})
    );
    render(<ProductSearch/>)
    const searchBtn = screen.getByRole('button',{name:/search/i})
    const searchInput = screen.getByPlaceholderText(/search products/i)
    const query = 'shoes'
    await userEvent.type(searchInput,query);
    await userEvent.click(searchBtn);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument()
  })

   it('triggers error', async () => {
    
    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    );
    render(<ProductSearch/>)
    const searchBtn = screen.getByRole('button',{name:/search/i})
    const searchInput = screen.getByPlaceholderText(/search products/i)
    const query = 'shoes'
    await userEvent.type(searchInput,query);
    await userEvent.click(searchBtn);

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })

   it('return empty list ', async () => {

    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    render(<ProductSearch/>)
    const searchBtn = screen.getByRole('button',{name:/search/i})
    const searchInput = screen.getByPlaceholderText(/search products/i);

    await userEvent.type(searchInput, 'anything');
    await userEvent.click(searchBtn);

    expect(await screen.findByText(/no products found/i)).toBeInTheDocument()

  })

})