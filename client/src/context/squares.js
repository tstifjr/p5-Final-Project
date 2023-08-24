import React, {useState} from "react";

const SquaresContext = React.createContext()

function SquaresProvider({children}){
    const [squares, setSquares] = useState(null);
    return <SquaresContext.Provider value={{squares, setSquares}}>{children}</SquaresContext.Provider>
}

export {SquaresContext, SquaresProvider};