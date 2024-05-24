import './App.css';
import BookTable from './components/BookTable';
import LoginButton from './components/login';
import login from './components/login';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {user, isAuthenticated}  = useAuth0();
  console.log(user);
  return (
     <>
     <BrowserRouter>
        <Routes>
          <Route path="/dashborad" element={ user ? <BookTable/> : <LoginButton/>}/>
          <Route path='/' element={user ? <BookTable/> : <LoginButton/>} />
        </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;
