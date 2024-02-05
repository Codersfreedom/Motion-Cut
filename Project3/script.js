const tumbnail = document.querySelectorAll(".box");
const bag = document.querySelector(".bag");
const coverImage = document.querySelector("#cover-img");
const boxImage = document.querySelectorAll(".box");
const heart = document.querySelector("#heart");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const count = document.querySelector("#count");
const product_name = document.querySelector("#product-name").textContent;
const size = document.querySelectorAll(".size");
const colour = document.querySelectorAll(".color");
const price = document.querySelector("#product-price");
const AddtoCart = document.querySelector("#cart-button");
var CartCount = document.querySelector("#cart-count");
const cart_container = document.querySelector(".cart-container");
const cartMenu = document.querySelector(".cart-menu");
const wishlist = JSON.parse(localStorage.getItem("wishlist"));
var Product = localStorage.getItem("product");
var cart_product;
if (Product && Product.length != 0) {
  cart_product = JSON.parse(Product);
}
const wishlist_array = [];
const product = [
  {
    id: 1,
    name: "",
    img: "",
    size: null,
    color: "",
    price: null,
    count: null,
  },
];

// check is product is already in wishlist
if (wishlist != null && wishlist.find((name) => name === `${product_name}`)) {
  heart.classList.replace("fa-regular", "fa-solid");
}

// Check if product is already in cart
if (
  cart_product != null &&
  cart_product.find((cart) => cart.name === `${product_name}`)
) {
  AddtoCart.setAttribute("disabled", "true");
  AddtoCart.textContent = "Added to cart";
}
// Setting cart  count
cart_product != null
  ? (CartCount.textContent = cart_product.length)
  : (CartCount.textContent = 0);

//Thumbnail click event
tumbnail.forEach((box) => {
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
let itemCount = 1;

plus.addEventListener("click", () => {
  itemCount++;
  count.value = itemCount;
});
//decrement event
minus.addEventListener("click", () => {
  if (itemCount >= 2) {
    itemCount--;
    count.value = itemCount;
  }
});

// select size event handle
var selectedSize;

size.forEach((ele) => {
  ele.addEventListener("click", () => {
    size.forEach((box) => {
      if (box.classList.contains("active")) selectedSize = box;
    });
    selectedSize.classList.remove("class", "active");
    ele.classList.contains("active")
      ? ele.classList.remove("class", "active")
      : ele.classList.add("active");
  });
});

//select color event handle
var selectedColor;
colour.forEach((c) => {
  c.addEventListener("click", (e) => {
    colour.forEach((color) => {
      if (color.classList.contains("active")) selectedColor = color;
    });
    var Style = getComputedStyle(c);
    selectedColor.classList.remove("class", "active");
    selectedColor.style.boxShadow = null;

    if (c.classList.contains("active")) {
      c.classList.remove("class", "active");
    } else {
      c.classList.add("active");
      c.style.boxShadow = `0 0 15px 3px ${Style.backgroundColor}`;
    }
  });
});

//Add to cart event handle
AddtoCart.addEventListener("click", () => {
  let ItemCount = count.value;
  let ItemSize;
  let ItemColor;
  let ItemSyle;
  let i;

  cart_product != null ? (i = cart_product.length) : (i = 0);

  size.forEach((s) => {
    if (s.classList.contains("active")) {
      ItemSize = s.textContent;
    }
  });
  colour.forEach((c) => {
    if (c.classList.contains("active")) {
      ItemSyle = getComputedStyle(c);
      ItemColor = ItemSyle.backgroundColor;
    }
  });

  product[i].name = product_name;
  product[i].price = price.textContent;
  product[i].img = coverImage.src;
  product[i].size = ItemSize;
  product[i].color = ItemColor;
  product[i].count = ItemCount;
  localStorage.setItem("product", JSON.stringify(product));
  AddtoCart.setAttribute("disabled", "true");
  AddtoCart.textContent = "Added to cart";

  CartCount.textContent = JSON.parse(localStorage.getItem("product")).length;
  updated_cart = JSON.parse(localStorage.getItem("product"));
  updated_cart?.forEach((p) => {
    const newItem = document.createElement("div");
    newItem.setAttribute("class", `cart-items ci${p.id}`);
    newItem.innerHTML = ` <div class="cart-title">
    <a href ="#">
    <img id="cart-thumbnail" src="${p.img}" alt="item">
    </a>
    <a href="#"><h3>${p.name} <small>X(${p.count})</small></h3> </a>
   <i id='trash' class="fa-regular fa-trash-can"></i>
   <input  type="hidden" value=${p.id}>
  </div>
  <div class="cart-price">
   <p>Price: ${p.price}</p>
   <p>Size: ${p.size}</p>
   <div class='color-box'>
   <p>Color</p>
  <p id ='cart-product-color' style ='background-color: ${p.color};' ></p>
  </div>
  </div>`;
    cart_container.appendChild(newItem);
  });
});

// open cart menu event handle
bag.addEventListener("click", () => {
  cartMenu.classList.toggle("cart-menu-active");
});

// display cart items

cart_product?.forEach((p) => {
  const newItem = document.createElement("div");
  newItem.setAttribute("class", `cart-items ci${p.id}`);
  newItem.innerHTML = ` <div class="cart-title">
  <a href ="#">
 <img id="cart-thumbnail" src="${p.img}" alt="item">
 </a>
 <a href="#"><h3>${p.name} <small>X(${p.count})</small></h3> </a>

 <i id='trash' class="fa-regular fa-trash-can"></i>
 <input  type="hidden" value=${p.id}>
 
</div>
<div class="cart-price">
 <p>Price: ${p.price}</p>
 <p>Size: ${p.size}</p>
 <div class='color-box'>
 <p>Color</p>
<p id ='cart-product-color' style ='background-color: ${p.color};' ></p>
</div>
</div>`;
  cart_container.appendChild(newItem);
});

// Remove item from cart event handle

const DeleteBtn = document.querySelector("#trash");
console.log(DeleteBtn);
DeleteBtn?.addEventListener("click", (e) => {
  const parent = e.target.parentElement;
  const produt_id = parent.children[3].value;
  for (let i = 0; i < cart_product.length; i++) {
    const element = cart_product[i];
    if (element.id == produt_id) {
      delete cart_product[i];
      localStorage.setItem("product", cart_product);
      document.querySelector(`.ci${produt_id}`).remove();
      CartCount.textContent = localStorage.getItem("product").length;
      AddtoCart.removeAttribute("disabled");
      AddtoCart.textContent = "Add to cart";
    }
  }
});
