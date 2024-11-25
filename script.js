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
  if (trip.departure === "" || trip.arrival === "" || trip.date === "") {
    document.getElementById("image").src = "./images/notfound.png";
    document.getElementById("trip-text").textContent = "No trip found.";
    return;
  }
  fetch("https://tickethack-backend-psi.vercel.app/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.tripsFilter.length <= 0) {
        document.querySelector("#layout-right-img-text").style.display = "flex";
        document.getElementById("trips").style.display = "none";
      } else {
        const trips = data.tripsFilter;
        document.querySelector("#layout-right-img-text").style.display = "none";
        document.getElementById("trips").style.display = "block";
        for (let i = 0; i < trips.length; i++) {
          const date = new Date(trips[i].date);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const travelDiv = document.createElement("div");
          travelDiv.classList.add("travel");
          travelDiv.innerHTML = `
          <div>
              <p>${trips[i].departure} </p> <span>></span> <p> ${trips[i].arrival}</p>
           </div>
           <div>
              <p>${hours}</p><span>:</span><p>${minutes}</p>
            </div>
            <div>
              <p>${trips[i].price}</p><span>€</span>
            </div>
           <button id='${trips[i]._id}' class='add-book'>Book</button>
           `;
          document.getElementById("trips").appendChild(travelDiv);
        }
        const addBook = document.querySelectorAll(".add-book");
        addBook.forEach((element) => {
          element.addEventListener("click", (event) => {
            const id = event.target.id;
            fetch(`https://tickethack-backend-psi.vercel.app/carts`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              });
          });
        });
      }
    });
});
