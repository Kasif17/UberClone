import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignup from './Pages/CaptainSignup'

const App = () => {
  return (
    <Routes>
      <Route path='/' element ={ <Home/>}></Route>
      <Route path='/login' element ={ <UserLogin/>}></Route>
      <Route path='/signup' element ={ <UserSignup/>}></Route>
      <Route path='/captain-login' element ={ <CaptainLogin/>}></Route>
      <Route path='/captain-signup' element ={ <CaptainSignup/>}></Route>
    </Routes>
  )
}

export default App
