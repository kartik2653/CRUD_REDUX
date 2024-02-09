import './App.css';
import Dashboard from './screens/Dashboard';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Profile from './screens/Profile';

import {Route,RouterProvider } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
       <Route path = '/' element = {<Dashboard/>}/>
          <Route path = 'signup' element = {<Signup/>}/>
          <Route path= 'login' element={<Login/>}/>
          <Route path= 'profile' element={<Profile/>}/>
    </Route>
  ))
   return (
    <div className="App">
      {/* <Dashboard/> */}
      {/* <Signup/> */}
      {/* <Login/>  */}
      {/* <Profile/> */}
      <RouterProvider router = {router}/>
      {/* <Loader/> */}
    </div>
   
  );
}

export default App;
