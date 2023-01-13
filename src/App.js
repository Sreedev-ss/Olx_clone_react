import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { AuthContext } from './store/Context';
import './App.css';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/postContext';
import Profile from './Pages/Profile'
import Admin from './Pages/Admin';
import AdminLogin from './Pages/AdminLogin';



function App() {
  const { user, setUser } = useContext(AuthContext)
  const history = useHistory()
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])
  return (
    <div>
      <Router>
        <Post>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          {user?.email != "admin@gmail.com" && <Route path="/sell">
            <Create />
          </Route>}

          {user?.email != "admin@gmail.com" && <Route path="/view">
            <View />
          </Route>}

          {user?.email != "admin@gmail.com" && <Route path="/profile">
            <Profile />
          </Route>}

        </Post>
        {user?.email == 'admin@gmail.com' && <Route exact path="/admin">
          <Admin />
        </Route> }

        <Route path="/admin/login">
          <AdminLogin />
        </Route>
      </Router>
    </div >
  );
}

export default App;
