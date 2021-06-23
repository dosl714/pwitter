import React, { useState } from "react";
import { storageService,dbService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PweetFactory = ({userObj}) => {
    const [pweet,setPweet] = useState("");
    //form을 위한 state.
    const [attachment, setAttachment] = useState("");
 
    const onSubmit = async (event) => {
        if(pweet === ""){
            return;
        }
        event.preventDefault();
        let attachmentURL ="";
        if (attachment !== ""){
            const attachmentRef = storageService
            .ref()
            .child(`${ userObj.uid}/${uuidv4()}`);
        //child에서 컬렉션 생성(dir)
        const response = await attachmentRef.putString(attachment, "data_url")
        attachmentURL = await response.ref.getDownloadURL();
        } //attachmentURL 같은게 lexical scope(정적범위,어휘범위)라고 함.
        // if문에 attachmentURL이 정의되어있으나, 명령은 if문 안에 없음.
        const pweetObj = {
            text:pweet,
            createdAt: Date.now(),
            creatorId:userObj.uid,
            attachmentURL,
        };
        
       await dbService.collection("pweets").add(pweetObj);
        setPweet("");
        setAttachment("");
    }

    const  onChange = (event) =>{
        const { target : {value}} = event;
        setPweet(value);
    }

    const onFileChange=(event)=>{
        const {
            target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend=(finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("") 

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                className="factory__input"
                value={pweet} 
                onChange={onChange} 
                type="text" 
                placeholder="What's on UR Mind?" 
                maxLength={140} />
                <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
                </div>
                <label for="attach_file" className="facttoryInput__label">
                <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
                </label>
                <input id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                 }}
                />
                {attachment && (
                    <div className="factoryForm__attachment">
                    <img src={attachment} 
                    style={{backgroundImage: attachment,}}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>)}
            </form>
    )
}

export default  PweetFactory;