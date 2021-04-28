import React, { useState, useContext, useEffect } from 'react'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
const AppContext = React.createContext();


const AppProvider = ({children}) => {
    
    

    

    const [clickedDocId, setClickedDocId] = useState(null);
    
    const [totalPrice,setTotalPrice] = useState(0);

   
   


    return <AppContext.Provider value = {
        {
            
          clickedDocId,
          setClickedDocId,
          totalPrice,
          setTotalPrice
            
        }
    } >{children}</AppContext.Provider>

}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext,AppProvider};