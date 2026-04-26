import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Api from '../components/api';

describe('api login test',() =>{

  beforeEach(()=>{
    render(<Api/>)
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the component elements', async () =>{
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/Login/i})).toBeInTheDocument();
  })

  it('logs in successfuly', async () =>{
  
    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({ ok: true })
    );

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.type(emailInput,'rita.dev4u@gmail.com')
    await userEvent.type(passwordInput,'12345678')
    await userEvent.click(loginBtn)
    expect(await screen.findByText(/welcome/i)).toBeInTheDocument()
  })

  it('logs in error', async () =>{
  
    (globalThis as any).fetch = jest.fn(() =>
      Promise.resolve({ ok: false })
    );

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.type(emailInput,'email@gmail.com')
    await userEvent.type(passwordInput,'12345678')
    await userEvent.click(loginBtn)
    expect(await screen.findByText(/error logging in/i)).toBeInTheDocument()
  })

  it('login loading', async () =>{
  
    (globalThis as any).fetch = jest.fn(() =>
      new Promise(() => {})
    );

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.type(emailInput,'email@gmail.com')
    await userEvent.type(passwordInput,'12345678')
    await userEvent.click(loginBtn)
    expect(await screen.findByText(/loading/i)).toBeInTheDocument()
  })

})