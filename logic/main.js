const getProducts = async () => {
    return await fetch('./data.json').then((res) => res.json()).then((value) => value);
} 

let resultSection = document.querySelector('#results');
let searchString = '';
const onSearchProducts = async (e) => {
    searchString = e.value;
    let products = await getProducts();
    if(!searchString) {
        resultSection.innerHTML = '';
        return;
    }
    handleSearchProducts(products);
}

const handleSearchProducts = debounce((products) => {
    let reg = new RegExp(searchString,'g');
    let results = [];
    if(!searchString) {
        resultSection.innerHTML = '';
        return;
    }
    products.forEach((p) => {
        let isMatchWithSearch = reg.exec(p.title);
        if(isMatchWithSearch) {
            results.push(p);
        }
    });
    if(!results.length) {
        resultSection.innerHTML = '';
        return;
    }
    results.forEach((r) => {
        resultSection.innerHTML += `<li>${r.title}</li>`;
    });
},3000)

function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  };