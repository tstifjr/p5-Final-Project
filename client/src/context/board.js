import React, {useState} from "react";

const BoardContext = React.createContext()

function BoardProvider({children}){
    const [board, setBoard] = useState(null);
    return <BoardContext.Provider value={{board, setBoard}}>{children}</BoardContext.Provider>
}

export {BoardContext, BoardProvider};