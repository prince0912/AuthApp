import './App.css';
import {BrowserRouter as Router, Routes,Route, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
// import Profile from './pages/Profile';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import { useContext } from 'react';
import Authcontext from './store/auth-context';


function App() {
  const authCtx =useContext(Authcontext)
  return (
    <div className="App">
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />}  />
        </Routes>
        { !authCtx.isLoggedIn && (
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
        )}
        { authCtx.isLoggedIn && (
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        ) }
          <Routes>
            <Route  path="*" element={<Home/>}/>
          </Routes>
        </Layout>
      </Router>

      
    </div>
  );
}

export default App;
