"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const counterElement = document.getElementById("counter");
const addToCardBtn = document.getElementById("addToCard");

const sizeListLiElements = document.querySelectorAll("#sizeList li");
const sizeListBtnElements = document.querySelectorAll("#sizeList li button");
const sizeListDatas = [...sizeListLiElements].map((item) => item.dataset.size);

let count = 1;
let selectedSize;
counterElement.value = count;
let cardItems = [];
const { category, price, name, color, image, sizes } = JSON.parse(localStorage.getItem("product"));

const pName = name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ");
console.log(pName);
productCategory.textContent = category;
productName.textContent = pName;
productPrice.textContent = `${price} AZN`;
productImage.src = image;
productColor.classList.add(`bg-${color}-500`);

decreaseBtn.addEventListener("click", () => {
    if (count > 1) {
        count--;
    }

    counterElement.value = count;
});
increaseBtn.addEventListener("click", () => {
    if (count < 10) {
        count++;
    }

    counterElement.value = count;
});

addToCardBtn.addEventListener("click", () => {
    cardItems = JSON.parse(localStorage.getItem("cardItems"));

    if (!selectedSize) {
        alert("You must select a size");
        return;
    }
    ;
    const addedProduct = {
        name: pName,
        price: price,
        category: category,
        color: color,
        image: image,
        count: count,
        size: selectedSize,
    };

    if (!cardItems) {
        cardItems = [addedProduct];
    } else {

        const exisitingProduct = cardItems.find((cardItem) => cardItem.name === pName && cardItem.size === selectedSize);
        const exisitingProductIndex = cardItems.findIndex((cardItem) => cardItem.name === pName && cardItem.size === selectedSize);

        if (exisitingProduct && exisitingProductIndex  !== undefined) {
            cardItems.splice(exisitingProductIndex, 1);
            
            exisitingProduct.count += count;
            cardItems.push(exisitingProduct);
        } else {
            cardItems.push(addedProduct);
        }
    }
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
});

sizeListDatas.forEach((size, index) => {
    if (!sizes.includes(size)) {
        sizeListLiElements[index].classList.add("opacity-40");
        sizeListBtnElements[index].classList.add("cursor-not-allowed");
        sizeListBtnElements[index].setAttribute("disabled", true)
    }


    sizeListLiElements[index].addEventListener("click", (event) => {
        selectedSize = size;

        for (let i = 0; i < sizeListBtnElements.length; i++) {
            sizeListBtnElements[i].classList.remove("bg-black", "text-white");
        }
        event.target.classList.add("bg-black", "text-white");
    });
});


