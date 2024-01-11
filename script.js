let products = [];

document.addEventListener("DOMContentLoaded", () => {
  // Load existing products from JSON file
  loadProducts();

  // Display existing products
  displayProducts();

  // Add event listener to the form
  document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addProduct();
  });
});

function loadProducts() {
  // Fetch products from the JSON file (assuming the file is hosted on the same domain)
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      products = data;
      displayProducts();
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
}

function saveProducts() {
  // Save products to the JSON file
  fetch("products.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Products saved successfully:", data);
    })
    .catch(error => {
      console.error("Error saving products:", error);
    });
}

function addProduct() {
  const productName = document.getElementById("productName").value;
  const productCode = document.getElementById("productCode").value;
  const productDescription = document.getElementById("productDescription").value;
  const productPrice = parseFloat(document.getElementById("productPrice").value);

  if (!productName || !productCode || !productDescription || isNaN(productPrice) || productPrice <= 0) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const newProduct = {
    name: productName,
    code: productCode,
    description: productDescription,
    price: productPrice.toFixed(2),
  };

  products.push(newProduct);

  // Save products to the JSON file
  saveProducts();

  // Display updated products
  displayProducts();

  // Clear the form
  document.getElementById("productForm").reset();
}

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.description}</td>
      <td>$${product.price}</td>
      <td class="actions">
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

function editProduct(index) {
  const productToEdit = products[index];
  document.getElementById("productName").value = productToEdit.name;
  document.getElementById("productCode").value = productToEdit.code;
  document.getElementById("productDescription").value = productToEdit.description;
  document.getElementById("productPrice").value = productToEdit.price;

  // Remove the edited product from the array
  products.splice(index, 1);

  // Save the updated products to the JSON file
  saveProducts();

  // Display updated products
  displayProducts();
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    // Remove the product from the array
    products.splice(index, 1);

    // Save the updated products to the JSON file
    saveProducts();

    // Display updated products
    displayProducts();
  }
}
