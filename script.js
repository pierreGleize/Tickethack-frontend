const search = document.getElementById("search");

search.addEventListener("click", () => {
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const calendar = document.getElementById("date").value;
  console.log(departure, arrival, calendar);
  //   fetch("http://localhost:3000/trips")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (!data.result) {
  document.getElementById("image").src = "./images/notfound.png";
  document.getElementById("trip-text").textContent = "No trip found.";
  //   }else{
  //   const trips = data.allTrips;
  //   document.querySelector(".layout-right").textContent = "";
  //   for (let i = 0; i < trips.length; i++) {
  //     document.querySelector(".layout-right").textContent += `
  //         <div>
  //         <p>${trips.departure} > ${trips.arrival}</p>
  //         <p>17:11</p>
  //         <p>136€</p>
  //         <button id='add-book${i}'>Book</button>
  //         `;
  //   }

  //   }
  // });
});

document.querySelector(".layout-right").innerHTML = `
<div class='travel'>
<p>Paris > Lyon</p>
<p>17:11</p>
<p>136€</p>
<button id='add-book'>Book</button>
</div>
`;
