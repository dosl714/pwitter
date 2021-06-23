import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Pweet = ({pweetObj, isOwner}) => {

    const [editing, setEditing] = useState(false);
    //editing 모드인가 아닌가
    const [newPweet, setNewPweet] = useState(pweetObj.text);
    //text update.(input 을 update)

    const onDeleteClick = async () => {
        const ok = window.confirm("해당 pweet을 삭제하시겠습니까?");
        if(ok){
           await dbService.doc(`pweets/${pweetObj.id}`).delete();
           if(pweetObj.attachmentURL !=="" ){await storageService.refFromURL(pweetObj.attachmentURL).delete();
        }}
    };

    const toggleEditing = () => setEditing(prev => !prev)

    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.doc(`pweets/${pweetObj.id}`).update({
            text: newPweet,
        });
        setEditing(false);
    }

    const onChange=(event) =>{
        const {target:{value},}=event;
        setNewPweet(value);
    }

    return (
        <div className="pweet">
            {
            editing ? (<>
            {isOwner && (<>
            <form onClick={onSubmit} className="container pweetEdit">
                <input 
                type="text" 
                placeholder="Edit U R Pweet."
                value={newPweet} 
                required
                autoFocus
                onChange={onChange}
                className="formInput"
                />
                <input type="submit" value="update Pweet" className="formBtn"/>
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
            </>)}
            </>)
            :(<>
            <h4>{pweetObj.text} </h4>
            {pweetObj.attachmentURL && <img src={pweetObj.attachmentUrl} />}
            {isOwner && (<>
            <div className="pweet_actions">
            <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
                </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
                </>)
            }</>)
        }
        </div>
    )
};


export default Pweet;