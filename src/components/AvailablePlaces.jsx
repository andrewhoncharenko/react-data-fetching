import ErrorPage from "./Error.jsx";
import Places from './Places.jsx';

import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from '../http.js';
import useFetch from '../hooks/useFetch.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const {
    isFetching,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
    error
} = useFetch(fetchSortedPlaces, []);

  function fetchSortedPlaces() {
    return fetchAvailablePlaces().then((places) => {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          resolve(sortedPlaces);
        });
      });
    });
  }

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
