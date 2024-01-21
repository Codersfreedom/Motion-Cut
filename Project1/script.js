const toggleThemebtn = document.querySelector("input[name=themeBtn]");
const monthToggle = document.querySelector("input[name=month-year]");
const select = document.getElementById("currency");
const hamburger = document.querySelector('.hamburger-container')
const togglelist = document.querySelector('.options')
const menu = document.querySelector(".hamburger")
const cross = document.querySelector('.cross');
const newElement = document.createDocumentFragment();
const standard = document.querySelector(".st-price");
const ultimate = document.querySelector(".ul-price");
const free = document.querySelector(".price");
var stPrice = 99;
var prePrice = 149;
var currency ={};
var toggle = false;

toggleThemebtn.addEventListener("change", function () {
  if (this.checked) {
    document.body.style.backgroundColor = "#192734";
    document.body.style.color = "white";
    togglelist.style.backgroundColor ="#192734"; 
    togglelist.style.color = 'white'
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.removeProperty("color");
    togglelist.style.backgroundColor="white"
    togglelist.style.color = 'black'



  }
});

// API was working but it's country names are so diffrent -- you can uncommand and see the dropdown menu

// fetch(
//   `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`
// )
//   .then((res) => res.json())
//   .then((res) => {
//     const keys = Object.keys(res).length;
//     const data = Object.keys(res);
//     for (let i = 1; i < keys; i++) {
//       var option = document.createElement("option");
//       option.value = data[i];

//       option.appendChild(document.createTextNode(data[i]));
//       newElement.appendChild(option);
//     }

//     select.appendChild(newElement);
//   })
//   .catch((err) => console.log(err));
  
select.addEventListener("change", (e) => {
  if(e.target.value==='INR'){
    monthToggle.checked = false;
    free.innerHTML = `&#8377 0`
    standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*82.93809997)} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*82.93809997)} <small>/ month </small>  </p>`;
    
    monthToggle.addEventListener("change", function () {
      if (this.checked) {
        standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*5.04*82.93809997)} <small>/ year </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*6.704*82.93809997)} <small>/ year </small>  </p>`;
      } else {
        standard.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(stPrice*82.93809997)} <small>/ month </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#8377 ${Math.ceil(prePrice*82.93809997)} <small>/ month </small>  </p>`;
      }
  
    })

  }else if(e.target.value === 'USD'){
    monthToggle.checked = false;
    free.innerHTML = `&#36 0`
    standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice)} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice)} <small>/ month </small>  </p>`;

    monthToggle.addEventListener("change", function () {
      if (this.checked) {
        standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice*5.04)} <small>/ year </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice*6.704)} <small>/ year </small>  </p>`;
      } else {
        standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice)} <small>/ month </small>  </p>`;
        ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice)} <small>/ month </small>  </p>`;
      }
  
    })
  }
});

monthToggle.addEventListener("change", function () {
  if (this.checked) {
    standard.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(stPrice*5.04)} <small>/ year </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${Math.ceil(prePrice*6.704)} <small>/ year </small>  </p>`;
  } else {
    standard.innerHTML = `<p class="ul-price">&#36 ${stPrice} <small>/ month </small>  </p>`;
    ultimate.innerHTML = `<p class="ul-price">&#36 ${prePrice} <small>/ month </small>  </p>`;
  }
});

hamburger.addEventListener('click',()=>{
    // togglelist.removeProperty('class')
    if(!toggle){
      togglelist.classList.replace('options','toggle')
      cross.style.display ='block';
      menu.style.display = 'none';
      toggle = true;

    }else{
      togglelist.classList.replace('toggle','options');
      menu.style.display = 'block';
      cross.style.display= 'none'
      toggle = false;
    }

})

window.addEventListener('mouseup',(e)=>{
  console.log(e.target)
  if(!document.querySelector('.toggle').contains(e.target) && !hamburger.contains(e.target)){
    togglelist.classList.replace('toggle','options');
    menu.style.display = 'block';
    cross.style.display= 'none'
    toggle=false
  }
})