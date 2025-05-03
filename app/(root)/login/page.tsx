import { LoginForm } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.login,
}

export default function Login() {
  return <LoginForm />
}