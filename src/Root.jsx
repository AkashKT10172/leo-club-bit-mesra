import {React, Suspense, lazy} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Header/Header'
import { store } from './components/app/store'
import { Provider } from 'react-redux'
const Footer = lazy(() => import('./components/Footer/Footer' ));
const Root = () => {
  return (
    <>
    <Provider store={store}>
    <Navbar />
    <Suspense fallback={<div className='min-h-screen flex justify-center items-center'>Please wait, we are Loading...</div>}>
    <Outlet />
    </Suspense>
    <Footer />
    </Provider>
    </>
  )
}

export default Root