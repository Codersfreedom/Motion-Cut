const toggleThemebtn = document.querySelector("input[name=themeBtn]");
const monthToggle = document.querySelector("input[name=month-year]");
const select = document.getElementById("currency");
const newElement = document.createDocumentFragment();
const standard = document.querySelector(".st-price");
const ultimate = document.querySelector(".ul-price");

toggleThemebtn.addEventListener("change", function () {
  if (this.checked) {
    document.body.style.backgroundColor = "#192734";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.removeProperty("color");
  }
});

fetch(
  `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`
)
  .then((res) => res.json())
  .then((res) => {
    const keys = Object.keys(res).length;
    const data = Object.keys(res);

    for (let i = 1; i < keys; i++) {
      var option = document.createElement("option");
      option.value = data[i];

      option.appendChild(document.createTextNode(data[i]));
      newElement.appendChild(option);
    }

    select.appendChild(newElement);
  })
  .catch((err) => console.log(err));

select.addEventListener("change", (e) => {
  console.log(e.target.value);
});

monthToggle.addEventListener("change", function () {
  if (this.checked) {
    standard.innerHTML = `<p class="ul-price">&#36 499 <small>/ year </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 999 <small>/ year </small>  </p>`;
  } else {
    standard.innerHTML = `<p class="ul-price">&#36 99 <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 149 <small>/ month </small>  </p>`;
  }
});
