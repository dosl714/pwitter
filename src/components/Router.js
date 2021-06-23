import React from "react";
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
            {isLoggedIn ? (
            <div style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}>
            <Route exact path="/" >
                <Home userObj={userObj} />
            </Route> 
            <Route exact path="/profile" >
                <Profile userObj={userObj} 
                refreshUser={refreshUser} />
            </Route> 
            </div>
            ) : (
                <>
            <Route exact path="/">
                <Auth />
            </Route>
            </>
            )}
            </Switch>
        </Router>
    )
}
//fragment 부모요소가 없는데 많은 요소들을 render 하고 싶을 떄 사용함.
//div나 span이고 뭐고넣기 싫을 떄 사용.

export default AppRouter;
