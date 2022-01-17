import react from 'react'
import { Route , Routes } from 'react-router-dom'
 
import './About.css'
import Home from './components/Home'
import About  from './components/About'
import Logout from './components/Logout'

const App = ()=>{

  return(
  <>

   

   <Routes>
      <Route exact path='/' element={< Home />}></Route>
     <Route exact path = '/dashboard' element = {<About />} > </Route>
     <Route exact path = '/logout' element = {<Logout />} ></Route>
   </Routes>
  </>

  )

}


export default App;
