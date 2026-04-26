import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductSearchV2 from "../components/productSearchV2";

describe('Product Search V2',() => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
jest.useFakeTimers() 
jest.setTimeout(3000)
  it('loads fetches the products after 300ms', async () => {
    
   

    (globalThis as any).fetch = jest.fn(() =>
     
        Promise.resolve({
        ok: true,
        json: () => Promise.resolve([query]),
      })
      
      
    )

    render(<ProductSearchV2/>);
    
   
    const searchInput = screen.getByPlaceholderText(/search products/i);
    const query = 'shoes'
    await userEvent.type(searchInput, query);

    expect(await screen.findByText(/error fetching products/i)).toBeInTheDocument()


  })

})
