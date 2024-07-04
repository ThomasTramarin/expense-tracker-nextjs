"use client";
import { useState, createContext, useEffect, useCallback } from "react";

export const GetIncomesContext = createContext();

export const GetIncomesProvider = ({ children }) => {
  const [data, setData] = useState({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/get-incomes");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  //Inital fetch data
  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  //Fetch data when refreshData is true
  useEffect(() => {
    if (refreshData) {
      fetchData();
      setRefreshData(false); 
    }
  }, [fetchData, refreshData]);

  return (
    <GetIncomesContext.Provider value={{ data, loading, error, setRefreshData }}>
      {children}
    </GetIncomesContext.Provider>
  );
};