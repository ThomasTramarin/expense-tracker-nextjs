"use client";
import { useState, createContext, useEffect } from "react";

export const GetIncomesContext = createContext();

export const GetIncomesProvider = ({ children }) => {


  const [data, setData] = useState({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-incomes");
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GetIncomesContext.Provider value={{ data, loading, error }}>
      {children}
    </GetIncomesContext.Provider>
  );
};
