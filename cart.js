let total = 0;

fetch("https://tickethack-backend-psi.vercel.app/carts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.length <= 0) {
      document.querySelector(".cart-bookig-text").style.display = "flex";
      document.getElementById("cart").style.display = "none";
      document.querySelector(".myCart").innerHTML = "";
      document.querySelector(".text-total").style.display = "none";
      document.getElementById("cart-container").style.justifyContent = "center";
    } else {
      const cart = document.getElementById("cart");
      document.querySelector(".cart-bookig-text").style.display = "none";
      document.getElementById("cart").style.display = "flex";
      document.getElementById("cart-container").style.justifyContent =
        "space-between";
      document.querySelector(".myCart").innerHTML = "My cart";
      document.querySelector(".text-total").style.display = "flex";
      for (let i = 0; i < data.length; i++) {
        total += data[i].info.price;
        const date = new Date(data[i].info.date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const travelDiv = document.createElement("div");
        travelDiv.classList.add("travel-carts");
        travelDiv.innerHTML = `
        <div>
            <p>${data[i].info.departure} </p> <span>></span> <p> ${data[i].info.arrival}</p>
         </div>
         <div>
            <p>${hours}</p><span>:</span><p>${minutes}</p>
          </div>
          <div>
            <p>${data[i].info.price}</p><span>€</span>
          </div>
          <button id='${data[i].info._id}' data-info = '${data[i].info.price}' class='add-cart'>X</button>
         `;
        cart.appendChild(travelDiv);
      }
      console.log(total);
      document.getElementById("total").textContent = total;
      deleteCart();
    }
  });
function deleteCart() {
  const addCart = document.querySelectorAll(".add-cart");
  addCart.forEach((element) => {
    element.addEventListener("click", (e) => {
      const cart = e.target.id;
      const travelCarts = e.target.parentNode;
      const price = e.target.dataset.info;
      console.log(cart);
      fetch(`https://tickethack-backend-psi.vercel.app/carts/${cart}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          travelCarts.remove();
          total -= Number(price);
          document.getElementById("total").textContent = total;
          if (Number(total) <= 0) {
            console.log("hello");
            document.querySelector(".cart-bookig-text").style.display = "flex";
            document.getElementById("cart").style.display = "none";
            document.querySelector(".myCart").innerHTML = "";
            document.querySelector(".text-total").style.display = "none";
            document.getElementById("cart-container").style.justifyContent =
              "center";
          }
        });
    });
  });
}
