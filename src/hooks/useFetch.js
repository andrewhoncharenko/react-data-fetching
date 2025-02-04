import { useState, useEffect } from "react";

export default function useFetch(fetchFunction, initialValue) {

    const [isFetching, setIsFetching] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [error, setError] = useState();

    useEffect(() => {
        setIsFetching(true);
        fetchFunction().then((placesData) => {
          setFetchedData(placesData);
        }).catch((error) => {
          setError({message: error.message || "Failed to fetch data"});
        });
        setIsFetching(false);
      }, [fetchFunction]);
    
    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error
    };
}