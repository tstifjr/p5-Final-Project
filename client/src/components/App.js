import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup';
import NotFound from './NotFound';
import Profile from './Profile';
import { UserContext } from '../context/user';
import NavHead from './NavHead';
import LeaderBoard from './LeaderBoard';
// import Button from 'react-bootstrap/Button'
import About from './About';
import LetsPlay from './LetsPlay';
import GameViewer
 from './GameViewer';
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
            // history.push('/')
          })
        }
        else {
          r.json().then(message => {
            console.log(message)
            history.push("/login")
          })
        }
      })
  }, [setUser, history])

  return (
    <>

      {user ? <>
        <NavHead handleLogout={handleLogout} />
      </> :
        <></>}

      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path ="/home" component= {Home} /> */}
        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <Signup /> </Route>
        <Route path="/profile/:userId" component={Profile} />
        {/* <Route path="/boardmanager" component={EditBoard} /> */}
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route path="/about" component={About} />
        <Route path="/play" component={LetsPlay} />
        <Route path="/gameviewer" component={GameViewer} />


        <Route path="*"><NotFound /></Route>
      </Switch>
    </>
  );
}

export default App;
