// import logo from './logo.svg';
import '../App.css';
import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup';
import NotFound from './NotFound';
import Profile from './Profile';
import { UserContext } from '../context/user';
import NavHead from './NavHead';
import Board from './Board'

function App() {
  const { user, setUser } = useContext(UserContext)
  const history = useHistory()

  const handleLogout = () => {
    fetch("/logout", {
      method: 'DELETE'
    }).then(r => {
      if (r.ok) {
        console.log('logout sucessful')
        setUser(null)
        history.push('/login')
      }
    })
  }

  useEffect(() => {
    fetch('/checksession')
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setUser(user)
          })
        }
        else {
          r.json().then(message => {
            console.log(message)
          })
        }
      })
  }, [setUser])

  console.log(user)
  return (
    <>

      {user ? <>
        <NavHead handleLogout={handleLogout}/>
      </> :
      <></>}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <Signup /> </Route>
        {/* <Route path="/enter"><LoginSignup /></Route> */}
        <Route path="/profile" component={Profile} />
        <Route path="/board" component ={Board} />


        <Route path="*"><NotFound /></Route>
      </Switch>
    </>
  );
}

export default App;
