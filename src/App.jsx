import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserProfile from './Pages/UserProfile'
import EditUserProfile from './Pages/EditUserProfile'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile/:id' element={<UserProfile/>}/>
      <Route path='/editprofile' element={<EditUserProfile/>}/>
    </Routes>
      
    </>
  )
}

export default App



