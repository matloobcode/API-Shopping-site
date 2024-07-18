function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.unshift("all");
        for(var category of data)
        {
            var option = document.createElement("option");
            option.text = category.toUpperCase();
            option.value = category;

            document.getElementById("lstCategories").appendChild(option);
        }
    })
}

function LoadProducts(url){
    document.querySelector("main").innerHTML="";
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(var product of data)
        {
            var div = document.createElement("div");
            div.className="card m-2 p-2";
            div.style.width="230px";
            div.innerHTML = `
             <img src=${product.image} height="150" class="card-img-top">
             <div class="card-header" style="height:160px">
                <p>${product.title}<p>
             </div>
             <div class="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>${product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span class="bi bi-star-fill text-success"></span>
                    ${product.rating.rate} [${product.rating.count}]
                  </dd>
                </dl>
             </div>
             <div class="card-footer">
                <button onclick="AddClick(${product.id})" class="btn btn-danger w-100"> <span class="bi bi-cart4"></span> Add to Cart </button>
             </div>
            `;

            document.querySelector("main").appendChild(div);
        }
    })
}

function bodyload(){
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");
    GetCartItemsCount();
}
function CategoryChanged(){
    var categoryname = document.getElementById("lstCategories").value;
    if(categoryname=="all") {
        LoadProducts("https://fakestoreapi.com/products");
    } else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryname}`);
    }
}
var cartItems = [];
function GetCartItemsCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
}
function AddClick(id)
{
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cartItems.push(data);
        alert(`${data.title} \nAdded to Cart`);
        GetCartItemsCount();
    })
}
function LoadCartItems(){
    document.querySelector("tbody").innerHTML="";
    for(var item of cartItems)
    {
        var tr= document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        tdPreview.innerHTML = `
         <img src=${item.image} width="50" height="50">
        `;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPreview);

        document.querySelector("tbody").appendChild(tr);
    }
}