import React, { useContext, useState } from "react";
import { MyContext } from "./context";
import NewPlayerModal from "./newPlayerModal";
import EditModal from "./editModal";
import Pagination from "./pagination";

const Table = () => {

    const { deletePlayer, setModalState2, currentItems, totalCount, messageContent} = useContext(MyContext);

    const [editId, setEditId] = useState("id");


    return (
        <React.Fragment>
            <NewPlayerModal />
            <EditModal editId={editId} />

            <div className={messageContent.class} style={{background: messageContent.color}}><span>{messageContent.text}</span></div>

            <table id="table">
                <thead>
                    <tr>
                        <th>Name</th><th>Team</th><th>Nation</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map((player) => {
                            return (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.team}</td>
                                    <td>{player.nation}</td>
                                    <td>

                                        <button className="actionBtn edit-btn" onClick={() => { setEditId(player.id); setModalState2(true) }}>
                                            <div className="tooltip tooltip-edit">Edit</div>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button className="actionBtn ab2 delete-btn" onClick={() => deletePlayer(player.id)}>
                                            <div className="tooltip tooltip-delete">Delete</div>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className="footer">
                <span id="showInfo">Showing <b>{currentItems.length}</b> out of <b>{totalCount}</b> players.</span>
                <Pagination />
            </div>

        </React.Fragment>
    )
}
export default Table;