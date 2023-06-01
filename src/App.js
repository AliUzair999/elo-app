// import logo from './logo.svg';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes, Navigate } from "react-router-dom"

import { createTheme, ThemeProvider } from '@mui/material';

import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth'

import { useSelector, useDispatch } from 'react-redux'

import Layout from './Views/Layout';
import Dashboard from './Views/Dashboard';
import Signup from './Views/Signup';
import Login from './Views/Login';
import CreateAd from './Views/CreateAd';
import Profile from './Views/Profile';
import AboutELO from './Views/AboutELO';
import Men from './Views/Men';
import Women from './Views/Women';
import AdDetail from './Views/AdDetail';
import Cart from './Views/Cart';
import Nothing from './Views/Nothing';
import { useEffect } from 'react';


const theme = createTheme({
  palette: {
    primary: {
      light: '#4f5864',
      main: "#232f3e",
      dark: '#18202b',
    },
    secondary: {
      light: '#ffad33',
      main: "#ff9900",
      dark: '#b26b00',
    }
  }
})


function App() {


  //PROTECTED ROUTING

  const userData = useSelector((state) => state.UserReducer)
  console.log("redux userData", userData)
  const dispatch = useDispatch()

  const protectedRoute = (component) => {
    if (userData.user) {
      return component
    }
    else {
      return <Navigate to="/login" replace />
      // return <Login />

    }
  }

  const unProtectedRoute = (component) => {
    if (userData.user) {
      return <Navigate to="/dashboard" replace />
      // return <Dashboard userData={userData}/>
    }
    else {
      return component
    }
  }


  return (<>
    <ThemeProvider theme={theme}>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='dashboard/create-ad' element={protectedRoute(<CreateAd />)} />
          <Route path='dashboard/my-profile' element={protectedRoute(<Profile />)} />
          <Route path='dashboard/my-cart' element={protectedRoute(<Cart />)} />
          <Route path='dashboard/ad-detail/:category/:adId' element={<AdDetail />} />
          <Route path='about' element={<AboutELO />} />
          <Route path='signup' element={unProtectedRoute(<Signup />)} />
          <Route path='login' element={unProtectedRoute(<Login />)} />
          <Route path='men' element={<Men />} />
          <Route path='women' element={<Women />} />
          <Route path='*' element={<Nothing />} />

        </Route>
      </Routes>
    </ThemeProvider>
  </>
  );
}

export default App;
