"use client";
import { useState, createContext, useEffect } from "react";

export const GetExpensesContext = createContext();

export const GetExpensesProvider = ({ children }) => {
  const [data, setData] = useState({
    labels: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-expenses");
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
    <GetExpensesContext.Provider value={{ data, loading, error }}>
      {children}
    </GetExpensesContext.Provider>
  );
};
