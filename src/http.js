export function fetchAvailablePlaces() {
    return fetch("http://localhost:3000/places").then((response) => {
        if(!response.ok) {
            throw new Error("Failed to fetch places");
        }
        return response.json();
    });
};