import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import BookingCar from './pages/BookingCar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path = "/" exact component={Home}/>
      <Route path = "/bookingcar" exact component={BookingCar}/>
      <Route path = "/login" exact component={Login}/>
      <Route path = "/register" exact component={Register}/>
      </BrowserRouter>
    </div>
  )
}

export default App