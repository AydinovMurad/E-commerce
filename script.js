"use strict";
import products from "./data.js";
const filterBtns = document.querySelectorAll(".filterBtn");
const filterLists = document.querySelectorAll(".filterList");
const chevronIcons = document.querySelectorAll(".chevronIcon");
const categoryItems = document.querySelectorAll("#categoryList li");
const colorItems = document.querySelectorAll("#colorList li");
const colorItemsDots = document.querySelectorAll("#colorList li span");
const sizeItems = document.querySelectorAll("#sizeList li");
const productsCount = document.getElementById("products-count");
const productsElement = document.getElementById("products");


const filteredCategories = [];
const filteredColors = [];
const filteredSizes = [];

filterBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        filterLists[index].classList.toggle("hidden");
        chevronIcons[index].classList.toggle("-rotate-180");
    });

});


categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("font-black");

        const { category } = item.dataset;

        if (filteredCategories.includes(category)) {
            const indexOfCategory = filteredCategories.indexOf(category);
            filteredCategories.splice(indexOfCategory, 1);
        } else {
            filteredCategories.push(category);
        }
        console.log(filteredCategories);
        displayProducts();
    });
});


colorItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const { color } = item.dataset;

        colorItemsDots[index].classList.toggle("hidden");

        if (filteredColors.includes(color)) {
            const indexOfColor = filteredColors.indexOf(color);
            filteredColors.splice(indexOfColor, 1)
        } else {
            filteredColors.push(color)
        }
        console.log(filteredColors);
        displayProducts();
    });

});

sizeItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const { size } = item.dataset;

        item.classList.toggle("bg-gray-500");
        item.classList.toggle("text-white");

        if (filteredSizes.includes(size)) {
            const indexOfSize = filteredSizes.indexOf(size);
            filteredSizes.splice(indexOfSize, 1);
        } else {
            filteredSizes.push(size);
        }
        console.log(filteredSizes);
        displayProducts();
    });
});


const displayProducts = () => {
    const filteredProducts = products.filter((product) => {
        if (filteredCategories.length === 0 &&
            filteredColors.length === 0 &&
            filteredSizes.length === 0) {
            return true;
        }
        const categoryCondition = filteredCategories.length === 0 || filteredCategories.includes(product.category);

        const colorCondition = filteredColors.length === 0 || filteredCategories.includes(product.color);

        const sizeCondition = filteredSizes.length===0 || product.sizes.includes(size);
        return colorCondition && categoryCondition && sizeCondition;
    });


  
    productsElement.innerHTML = "";
    
    filteredProducts.forEach((product) => {
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
                const selectedProduct = filteredProducts[index];
                localStorage.setItem("product", JSON.stringify(selectedProduct));

            });
        });
    });

    productsCount.textContent = filteredProducts.length;
};


displayProducts();