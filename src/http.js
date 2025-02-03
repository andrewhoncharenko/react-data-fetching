export function fetchAvailablePlaces() {
    return fetch("http://localhost:3000/places").then((response) => {
        if(!response.ok) {
            throw new Error("Failed to fetch places");
        }
        return response.json();
    });
};

export function fetchUserPlaces() {
    return fetch("http://localhost:3000/user-places").then((response) => {
        if(!response.ok) {
            throw new Error("Failed to fetch user places");
        }
        return response.json();
    });
};

export function updateUserPlaces(places) {
    return fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({places}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if(!response.ok) {
            throw new Error("Failed to update user data.");
        }
        return response.json();
    });
};