import { render, screen } from "@testing-library/react";
import UsersList from "../components/usersList";

describe('Users List test',() => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should load the users', async () => {

    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(['Ana', 'João']),
      })
    );
    
    render(<UsersList/>)

    expect((globalThis as any).fetch).toHaveBeenCalledWith('/api/users');
    expect( await screen.findByText('Ana')).toBeInTheDocument()
    expect( await screen.findByText('João')).toBeInTheDocument()
 
  });

  it('should show loading message', () => {
    (globalThis as any).fetch = jest.fn(() =>
      new Promise (() => {})
    );

    render(<UsersList/>)
    expect((globalThis as any).fetch).toHaveBeenCalledWith('/api/users');
    expect( screen.getByText(/loading/i)).toBeInTheDocument()
  });

  it('should show error message', async () => {
    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    );

    render(<UsersList/>)
    expect((globalThis as any).fetch).toHaveBeenCalledWith('/api/users');
    expect( await screen.findByText(/error loading users/i)).toBeInTheDocument()
  });

  
})