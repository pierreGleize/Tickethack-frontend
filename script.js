const search = document.getElementById("search");

search.addEventListener("click", () => {
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const calendar = document.getElementById("date").value;
  const trip = {
    departure: departure,
    arrival: arrival,
    date: calendar,
  };
  console.log(typeof calendar);
  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.tripsFilter.length <= 0) {
        document.querySelector("#layout-right-img-text").style.display = "flex";
        document.getElementById("trips").style.display = "none";
        document.getElementById("image").src = "./images/notfound.png";
        document.getElementById("trip-text").textContent = "No trip found.";
      } else {
        const trips = data.tripsFilter;
        document.querySelector("#layout-right-img-text").style.display = "none";
        document.getElementById("trips").style.display = "block";
        for (let i = 0; i < trips.length; i++) {
          const travelDiv = document.createElement("div");
          travelDiv.classList.add("travel");
          travelDiv.innerHTML = `
           <p>${trips[i].departure} > ${trips[i].arrival}</p>
            <p>17:11</p>
           <p>${trips[i].price}€</p>
           <button id='add-book-${i}' class='add-book'>Book</button>
           `;
          document.getElementById("trips").appendChild(travelDiv);
        }
        const addBook = document.querySelectorAll(".add-book");
        addBook.forEach((element) => {
          element.addEventListener("click", (event) => {
            console.log(event.target.parentNode);
          });
        });
      }
    });
});
