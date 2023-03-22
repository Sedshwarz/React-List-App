import React, {useState, useEffect} from "react"

export const MyContext = React.createContext();

const ContextProvider = (props)=> {

    const uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);                // unique id function for players' id 
        return dateString + randomness;
      };


    const [modalState, setModalState] = useState(false);
    const [modalState2, setModalState2] = useState(false);


    const [players,setPlayers] = useState([
        {id: uniqueId(), name: "Lionel Messi", team: "Paris SG", nation: "Argentina"},
        {id: uniqueId(), name: "Cristiano Ronaldo", team: "Al Nassyr", nation: "Portugal"},
        {id: uniqueId(), name: "Kylian Mbappe", team: "Paris SG", nation: "France"},
        {id: uniqueId(), name: "Robert Lewandowski", team: "Barcelona", nation: "Poland"},
        {id: uniqueId(), name: "Mohammad Salah", team: "Liverpool", nation: "Egypt"},
        {id: uniqueId(), name: "Marco Reus", team: "Borussia Dortmund", nation: "Germany"},
        {id: uniqueId(), name: "Sergio Ramos", team: "Paris SG", nation: "Spain"},
        {id: uniqueId(), name: "Thiago Silva", team: "Chelsea", nation: "Brasil"},
        {id: uniqueId(), name: "Edinson Cavani", team: "Manchester United", nation: "Uruguay"},
        {id: uniqueId(), name: "Gianluigi Donnaruma", team: "Paris SG", nation: "Italy"},
        {id: uniqueId(), name: "Memphis Depay", team: "Atletico Madrid", nation: "Holland"},
        {id: uniqueId(), name: "Delle Ali", team: "Beşiktaş", nation: "England"},
        {id: uniqueId(), name: "Zlatan Ibrahimovic", team: "AC Milan", nation: "Sweeden"},
        {id: uniqueId(), name: "Thomas Müller", team: "Bayern Munich", nation: "Germany"},
        {id: uniqueId(), name: "Ering Haaland", team: "Manchester City", nation: "Norway"}
    ])

    const [totalCount, updateTotalCount] = useState(players.length);

    useEffect(()=>{
        const fetchedItems = JSON.parse(localStorage.getItem("players"));

        if (fetchedItems) {
            setPlayers(fetchedItems) 
            updateTotalCount(fetchedItems.length)                                    // localStorage'da verimiz varsa çek, players olarak ayarla ve sayacımıza o verinin uzunluğunu ata
        }

    }, [])
    
    window.onbeforeunload = ()=> {
        localStorage.setItem("players",JSON.stringify(players))                     // pencerenin kapanması/yenilenmesi durumunda localStorage'ı güncelle
    }
   

    /*
    useEffect(()=>{
        setPlayers(players.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))            // for sorting alphabetic
    }, [players])
    */


    const addPlayer = (plyr) => {
        setPlayers([...players,plyr])                          // when we add new player
        updateTotalCount(totalCount+1)
        showMessage("add")
    }

    const updatePlayer = (plyr) => {
        setPlayers(players.map(ply => ply.id === plyr.id ? {id: plyr.id, name: plyr.name, team: plyr.team, nation: plyr.nation} : ply))         // when we update a player
        showMessage("update")
    }

    const deletePlayer = (plyrId)=> {
        setPlayers(players.filter(ply=>ply.id !== plyrId))
        updateTotalCount(totalCount-1)

        if ((currentPageIndex + 1) === totalPageNum && currentItems.length === 1) {             // when we delete a player, we filter and update array, update total count and check wheter last page was deleted
            setCurrentPageIndex(currentPageIndex-1)
        }
        showMessage("delete")
    }


    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let recordPerPage = 3,                                                                          // calculatings for pagination 
    totalPageNum = Math.ceil(totalCount / recordPerPage),
    currentItems = players.slice((currentPageIndex*recordPerPage),(currentPageIndex*recordPerPage + recordPerPage))



    const [messageContent, setMC] = useState({class: "message", color: "#55daad", text: "Player has been added successfully!"})

    const showMessage = (prm)=> {
        if (prm === "add") {
            setMC({class: "message show-message", color: "#55daad", text: "Player has been added successfully!"})
            setTimeout(()=>{setMC({class: "message", color: "#55daad", text: "Player has been added successfully!"})},2500)
        }else if(prm === "update"){
            setMC({class: "message show-message", color: "#53b6d4", text: "Player has been updated successfully!"})                           // message management function
            setTimeout(()=>{setMC({class: "message", color: "#53b6d4", text: "Player has been updated successfully!"})},2500)
        }else{
            setMC({class: "message show-message", color: "#e9836a", text: "Player has been deleted successfully!"})
            setTimeout(()=>{setMC({class: "message", color: "#e9836a", text: "Player has been deleted successfully!"})},2500)
        }

    }








    return(
        <MyContext.Provider value={{players, setPlayers, modalState, setModalState, modalState2, setModalState2, addPlayer, uniqueId, updatePlayer, deletePlayer, currentItems, totalPageNum, currentPageIndex, setCurrentPageIndex, totalCount, messageContent}}>
            <div className="header"><h2>Manage Players</h2> <button onClick={()=>setModalState(true)}><i className="fa-solid fa-circle-plus"></i> Add New Player</button></div>
            {props.children}
        </MyContext.Provider>
    )
}
export default ContextProvider;