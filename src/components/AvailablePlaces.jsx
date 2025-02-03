import { useEffect, useState } from 'react';

import ErrorPage from "./Error.jsx";
import Places from './Places.jsx';

import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    try {
      fetchAvailablePlaces().then((placesData) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(placesData.places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      }).catch((error) => {
        setError({message: error.message || "Could not fetch places, please try again later."});
        setIsFetching(false);
      });
    }
    catch(error) {
      setError({message: error.message || "Could not fetch places, please try again later."});
      setIsFetching(false);
    }
  }, []);

  if(error) {
    return <ErrorPage title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isFetching}
      loadingText="Fetching places data..."
      onSelectPlace={onSelectPlace}
    />
  );
}
