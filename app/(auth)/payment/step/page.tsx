import { DefaultLayout } from '@lay/default'
import { Wrapper } from './wrapper'
import { PAGES } from '@uti/var'

export const metadata = {
  title: PAGES.step,
}

export default function App() {
  return (
    <DefaultLayout>
      <Wrapper />
    </DefaultLayout>
  )
}