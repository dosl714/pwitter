import React, { useEffect, useState } from "react";
import Pweet from "components/Pweet";
import { dbService } from "fbase";
import PweetFactory from "components/PweetFactory";


// export default () => <span>Home</span> //이렇게 하면 자동import안됨.

const Home = ({ userObj }) => {
//userObj = pweet all data
    const [pweets,setPweets] = useState([]);
//리 랜더를 하지 않기 때문에 구식방법보다 이게 훨씬 나음.

    useEffect(()=>{
        dbService
        .collection("pweets") //컬렉션에 어떤 이름으로 저장할것인가?
        .orderBy("createdAt","asc")
        .onSnapshot((snapshot) => {
            const pweetArray = snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            })//asc - 올림차순 desc - 내림차순
            )
            setPweets(pweetArray);
        })
    },[])

    return (
        <div className="container">
            <PweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {pweets.map((pweet)=>(
                    <Pweet
                    key={pweet.id} 
                    pweetObj={pweet}
                    isOwner={pweet.creatorId === userObj.uid}
                    />//isOwner 다이나믹한 props 어쩔때는 true / false..
                ))}
            </div>
        </div>  
    )
}

export default Home;