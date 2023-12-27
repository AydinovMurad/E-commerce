import products from "./data.js";

const categoryList = document.getElementById("categoryList");
const colorList = document.getElementById("colorList");
const sizeList = document.getElementById("sizeList");
const categories = [...new Set(products.map((product) => product.category))];
const colors = [...new Set(products.map((product) => product.color))];
const sizes = [...new Set(products.map((product) => product.sizes).flat())];
const productsElement = document.getElementById("products");


categories.forEach((category) => {
  categoryList.innerHTML +=
    `<li class="cursor-pointer text-black" data-category="${category}">
                                  ${category}
                                   </li>`;

});
colors.forEach((color) => {
  colorList.innerHTML +=
    `<li
        class="h-8 w-8 border ${color === "black" ? "bg-black" : `bg-${color}-500`} flex items-center justify-center rounded-full cursor-pointer"
        data-color="${color}"
        >
        <span class="h-3 w-3 rounded-full hidden bg-gray-200"></span>
        </li>  `;

});
sizes.forEach((size) => {
  sizeList.innerHTML +=
    `  <li
class="font-bold bg-gray-200 text-black w-9 h-9 flex items-center justify-center rounded-lg"
data-size="${size}"
>
<button class="uppercase w-full h-full">${size}</button>
</li>`
})
products.forEach((product) => {
  const pName = product.name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ");

  productsElement.innerHTML +=
   ` <div class="col-span-4 cursor-pointer productItem">
    <a href="./productPage/product.html">
      <div class="mb-4 border border-neutral-200 rounded-lg">
        <img
          src="${product.image}"
          alt=""
          class="w-full h-[500px]"
        />
      </div>
      <div class="flex justify-between font-bold">
        <div>
          <h1 class="text-xl">${pName}</h1>
          <p class="text-neutral-500">${product.category}</p>
        </div>
        <h1 class="text-2xl">
          <span>${product.price}</span>
          AZN
        </h1>
      </div>
    </a>
    </div> `

  const productItems = document.querySelectorAll(".productItem");
  productItems.forEach((productItem, index) => {
    productItem.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedProduct = products[index];
      localStorage.setItem("product", JSON.stringify(selectedProduct));

    });
  });
});


