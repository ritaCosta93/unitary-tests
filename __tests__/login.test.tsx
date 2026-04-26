
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LoginForm from "../components/login";

describe('test login form', () =>{

  beforeEach(()=>{
    render(<LoginForm/>)
  })

  it('renders the component elements', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    expect(emailInput).toBeInTheDocument()
    const passwordInput = screen.getByPlaceholderText('Password')
    expect(passwordInput).toBeInTheDocument()
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    expect(loginBtn).toBeInTheDocument()
  })

  it('gets the invalid email error empty email', async () => {
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.click(loginBtn)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

   it('gets the invalid email error invalid format', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.type(emailInput,'emailgmail.com')
    await userEvent.click(loginBtn)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('gets the invalid password error empty password', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput,'email@gmail.com')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.click(loginBtn)
    expect(screen.getByText('Password too short')).toBeInTheDocument()
  })
    
  it('gets the invalid password error password too short', async () => {
    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput,'rita.dev4u@gmail.com')
    const passwordInput = screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput,'123')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.click(loginBtn)
    expect(screen.getByText('Password too short')).toBeInTheDocument()
  })

   it('logs in successfully', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput,'rita.dev4u@gmail.com')
    const passwordInput = screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput,'12345678')
    const loginBtn = screen.getByRole('button',{name:/Login/i})
    await userEvent.click(loginBtn)
    expect(alertMock).toHaveBeenCalledWith('Login successful');
    alertMock.mockRestore();
  })

})

