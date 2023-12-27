"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");

const { category, price, name, color, image } = JSON.parse(localStorage.getItem("product"));

const pName = name.split (" ").map((name) => name[0].toUpperCase() + name.slice(1)).join (" ") ;
console.log(pName);
//22
productCategory.textContent = category;
productName.textContent = pName;
productPrice.textContent = `${price} AZN`;
productImage.src = image;
productColor.classList.add (`bg-${color}-500`);