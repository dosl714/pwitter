import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName , setNewDisplayName] = useState(userObj.displayName);
    
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const { 
            target : {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) =>  {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName ){
            //displaneName update!
             await userObj.updateProfile({
                displayName : newDisplayName,
            // photoURL:"" 이거는 숙제..
            });
            refreshUser(); //react.js에 있는 프로파일을 리프레시 시킬것임.
        }
        // 치명적인(?) 문제 :  업데이트 프로필 누르면 새로고침을 해야 내 프로필이 업데이트 된것을 볼수가 있음.
    }
    
    const getMyPweets = async () => {
        const pweets = await dbService
        .collection("pweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("creatorAt")
        .get();

        console.log(pweets.docs.map(doc => doc.data()))
    }
    //where은 필터링 하는 법을 알려줌.

    useEffect(() => {
        getMyPweets();
    },[] )

    return (
    <div className="container">
    <form onSubmit={onSubmit} className="profileForm">
        <input 
        onChange={onChange}
        type="text" 
        autoFocus
        placeholder="Display Name "
        value={newDisplayName}
        className="formInput"
        />
        <input type="submit"
        value="Update Profile"
        className="formBtn"
        style={{
            marginTop: 10,
          }}
        />
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
    )
}