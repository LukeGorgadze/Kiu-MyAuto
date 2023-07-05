import './App.scss'
import Navbar from './compos/Navbar'
import NavLiner from './compos/NavLiner'
import PageContent from './compos/PageContent'
export default function App() {
  return (
    <div className='APP'>
      <Navbar/>
      <NavLiner/>
      <PageContent/>
    </div>
  )
}