"use client"
import { createContext, useState, useCallback, useEffect, useDeferredValue } from "react";

export const GetTransactionsContext = createContext();

export const GetTransactionsProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshData, setRefreshData] = useState(false);

    const fetchData = useCallback(async () =>{
        setLoading(true);
        try{
            const response = await fetch("http://localhost:3000/api/transactions");
            const data = await response.json();
            setData(data);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }, [])

    //Inital fetch data
    useEffect(() =>{
        fetchData();
    }, [fetchData])

    //Fetch data when refreshData is true
    useEffect(()=>{
        if(refreshData){
            fetchData();
            setRefreshData(false);
        }
    }, [refreshData, fetchData])


  return (
    <GetTransactionsContext.Provider value={{data, loading, error, setRefreshData}}>
      {children}
    </GetTransactionsContext.Provider>
  );
};
