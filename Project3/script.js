const tumbnail = document.querySelector(".tumbnail").children;
const boxArray = Array.from(tumbnail);
const coverImage = document.querySelector("#cover-img");
const boxImage = document.querySelectorAll(".box");
const heart = document.querySelector("#heart");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const count = document.querySelector("#count");
const size = document.querySelectorAll(".size");
const color = document.querySelectorAll(".color");
const AddtoCart = document.querySelector("#cart-button");
const wishlist_array = [];
const wishlist = JSON.parse(localStorage.getItem("wishlist"));
const product_name = document.querySelector("#product-name").textContent;

const product = {
  name: `${product_name}`,
  price: 26000,
  color: [],
  size: [],
  count: 0,
};

// check is product is already in wishlist
if (wishlist != null && wishlist.find((name) => name === `${product_name}`)) {
  heart.classList.replace("fa-regular", "fa-solid");
}

//Thumbnail click event
boxArray.forEach((box) => {
  box.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let imgurl = e.target.src;
    boxImage.forEach((ele) => {
      ele.classList.contains("active") &&
        ele.classList.remove("class", "active");
    });
    parent.classList.add("active");
    coverImage.removeAttribute("src");
    coverImage.setAttribute("src", `${imgurl}`);
  });
});

// wishlist button click event
heart.addEventListener("click", (e) => {
  let product = e.target.parentElement.children[0].textContent;

  if (heart.classList.contains("fa-solid")) {
    heart.classList.replace("fa-solid", "fa-regular");
    localStorage.removeItem("wishlist", `${product}`);
  } else if (heart.classList.contains("fa-regular")) {
    heart.classList.replace("fa-regular", "fa-solid");
    wishlist_array.push(`${product}`);
    localStorage.setItem("wishlist", JSON.stringify(wishlist_array));
  }
});

//item count handle event

// increment event
let itemCount = 0;

plus.addEventListener("click", () => {
  itemCount++;
  count.value = itemCount;
});
minus.addEventListener("click", () => {
  if (itemCount >= 2) {
    itemCount--;
    count.value = itemCount;
  }
});

// select size event handle
var active;

size.forEach((ele) => {
  ele.addEventListener("click", () => {
    size.forEach((box) => {
      if (box.classList.contains("active")) active = box;
    });
    active.classList.remove("class", "active");
    ele.classList.contains("active")
      ? ele.classList.remove("class", "active")
      : ele.classList.add("active");
  });
});

//Add to cart event handle
AddtoCart.addEventListener("click", () => {});
