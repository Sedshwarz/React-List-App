import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./context";

const EditModal = (props) => {

    const {players, modalState2, setModalState2, updatePlayer} = useContext(MyContext)
   
    const editValues1 = players.filter(ply=>ply.id===props.editId)
    
    const editValues = editValues1.length < 1 ? [{id: "", name: "", team: "", nation: ""}] : editValues1

    const plyrId = editValues[0].id
    const [editNameState, setName] = useState("")
    const [editTeamState, setTeam] = useState("")
    const [editNationState, setNation] = useState("")

    useEffect(()=>{
        setName(editValues[0].name)
        setTeam(editValues[0].team)
        setNation(editValues[0].nation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[plyrId])

    const closeModal = ()=> {
        setModalState2(false)
    }

    const submitFunc = (e) => {
        e.preventDefault()
        const updatedObj = {id: plyrId, name: editNameState, team: editTeamState, nation: editNationState}
        updatePlayer(updatedObj)
        closeModal()
    }
    
    return (
        <React.Fragment>
            {
                modalState2 === true ? (
                    <div className="container">
                        <div className="wrap">
                            <header><h2>Update Player</h2> <i className="fa-solid fa-xmark close" onClick={closeModal}></i></header>
                            <form id="newPlayerForm" onSubmit={submitFunc}>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={editNameState} placeholder="Name" />
                                <input type="text" onChange={(e) => setTeam(e.target.value)} value={editTeamState} placeholder="Team" />
                                <input type="text" onChange={(e) => setNation(e.target.value)} value={editNationState} placeholder="Nation" />
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                ) : null
            }
        </React.Fragment>

    )
}
export default EditModal;