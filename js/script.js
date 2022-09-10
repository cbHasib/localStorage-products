const inputValue = (id) => {
  const input = document.getElementById(id);
  const value = input.value;
  input.value = "";
  return value;
};

const getLocalStorageData = () => {
  const data = localStorage.getItem("all_products");
  const jsData = JSON.parse(data);
  return jsData;
};

const setProductLocalStorage = (product_name, product_quantity) => {
  let products = getLocalStorageData();
  if (!products) {
    products = {};
  }
  if (products[product_name]) {
    products[product_name] = parseInt(product_quantity);
  } else {
    products[product_name] = product_quantity;
  }
  const stringifiedData = JSON.stringify(products);
  localStorage.setItem("all_products", stringifiedData);

  // console.table(getLocalStorageData());
};

const deleteData = (propertyName) => {
  // debugger;
  const allProducts = getLocalStorageData();
  const decision = confirm("Are sure you want to delete this product?");
  if (decision === true) {
    delete allProducts[propertyName];
    const stringifiedData = JSON.stringify(allProducts);
    localStorage.setItem("all_products", stringifiedData);
    displayProduct();
  }
  else{
    return;
  }
};

const editData = (propertyName) => {
  // console.log(propertyName)
//   const allProducts = getLocalStorageData();
//   const product_name = document.getElementById("product-name");
//   const product_quantity = document.getElementById("product-quantity");
//   product_name.value = propertyName;
//   product_quantity.value = allProducts[propertyName];

  const quantity = prompt('Input new Quantity for ' + propertyName);
  if(quantity === null){
    return;
  }
  else if (!Number.isInteger(Number(quantity)) || quantity.length === 0) {
    alert("wrong input");
    return;
  }

  setProductLocalStorage(propertyName, quantity)
  displayProduct();
};

const displayProduct = () => {
  const allProducts = getLocalStorageData();
  const productContainer = document.getElementById("all-products");
  productContainer.textContent = "";
  for (const product in allProducts) {
    const div = document.createElement("div");
    div.classList.add(
      "shadow-sm",
      "p-3",
      "mb-2",
      "bg-body",
      "rounded",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    div.innerHTML = `
        <div>
            <span class="fs-1">${product}</span>
            Quantity:<small class="fw-bold">
                ${allProducts[product]}
            </small>
        </div>
        <div>
        <button type="button" title="Update Quantity" class="btn-edit me-1" aria-label="Close" onclick="editData((this.parentNode.parentNode.children[0].children[0].innerText))"></button>
        <button type="button" title="Delete this Product" class="btn-close" aria-label="Close" onclick="deleteData((this.parentNode.parentNode.children[0].children[0].innerText))"></button>
        
        </div>
        `;
    productContainer.appendChild(div);
    // console.log(product, allProducts[product]);
  }
};

const addProduct = () => {
  const product_name = inputValue("product-name");
  const product_quantity = inputValue("product-quantity");

  if (!isNaN(product_name) || !Number.isInteger(Number(product_quantity))) {
    alert("wrong input");
    return;
  }

  setProductLocalStorage(product_name, product_quantity);

  displayProduct();

  // console.log(typeof product_name, Number.isInteger(Number(product_quantity)));
};

displayProduct();
