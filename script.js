document.getElementById("trackBtn").addEventListener("click", () => {
    const flightNumber = document.getElementById("flightNumber").value;
    fetchFlightInfo(flightNumber);
});

async function fetchFlightInfo(flightNumber) {
    const apiKey = "63b029caf83df2fd724743c4c8a68ab4"; // Get your API key from AviationStack

    try {
        const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("flightInfo").innerHTML = `<p>${data.error.info}</p>`;
        } else {
            const flight = data.data[0];
            const flightInfoHTML = `
                <p>Flight Number: ${flight.iata}</p>
                <p>Departure Airport: ${flight.departure.airport}</p>
                <p>Arrival Airport: ${flight.arrival.airport}</p>
                <p>Status: ${flight.flight_status}</p>
            `;
            document.getElementById("flightInfo").innerHTML = flightInfoHTML;
        }
    } catch (error) {
        console.error("Error fetching flight information:", error);
    }
}
