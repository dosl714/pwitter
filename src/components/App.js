import React,{ useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

/*function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [userObj, setUserObj ] = useState(null);

  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
       setInit(true);
    });
  },[]) 
  return (
    <>
    {init? <AppRouter isLoggedIn={ isLoggedIn }  userObj={ userObj } /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Pwitter</footer>
    </>
  )
}
//아래처럼 간단하게 가능.
*/

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj ] = useState(null);

  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
        /*if(user.displayName === null ){
          user.updateProfile({
            displayName:"Pwitter",
          });
        }*/
      } else {setUserObj(null);}
      setInit(true);
    });
  },[])


  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })
  }

  return (
    <>
    {init? <AppRouter 
      refreshUser={refreshUser} 
      isLoggedIn={ Boolean(userObj) }  
      userObj={ userObj } /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Pwitter</footer>
    </>
  )

    }

export default App;