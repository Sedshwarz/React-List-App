import React, { useContext, useState } from "react";
import { MyContext } from "./context";

const NewPlayerModal = () => {

    const {modalState, setModalState, uniqueId, addPlayer} = useContext(MyContext);

    const [newName, setName] = useState("");
    const [newTeam, setTeam] = useState("");
    const [newNation, setNation] = useState("");

    const closeModal = ()=> {
        setName("")
        setTeam("")
        setNation("")
        setModalState(false)
    }

    const submitFunc = (e) => {
        e.preventDefault()
        const newPlayerObject = {id:uniqueId(), name: newName, team: newTeam, nation: newNation}
        addPlayer(newPlayerObject)
        closeModal()
    }

    return (
        <React.Fragment>
            {
                modalState === true ? (
                    <div className="container">
                        <div className="wrap">
                            <header><h2>New Player</h2> <i className="fa-solid fa-xmark close" onClick={closeModal}></i></header>
                            <form id="newPlayerForm" onSubmit={submitFunc}>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={newName} placeholder="Name" />
                                <input type="text" onChange={(e) => setTeam(e.target.value)} value={newTeam} placeholder="Team" />
                                <input type="text" onChange={(e) => setNation(e.target.value)} value={newNation} placeholder="Nation" />
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                ) : null
            }
        </React.Fragment>

    )
}
export default NewPlayerModal;