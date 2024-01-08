var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById('category');
var submit = document.getElementById('submit');

var newAcc;
var mood = 'create';
var tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)




//get total

function getTotal(){


    if(price.value !=""){
        var result =(+price.value + +taxes.value + +ads.value)-+discount.value;
        total.innerHTML= result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02'
    }
}

// price.addEventListener('keyup',getTotal);
// taxes.addEventListener('keyup',getTotal);
// ads.addEventListener('keyup',getTotal);
// discount.addEventListener('keyup',getTotal);















var dataPro;
//creat product


//save data in localstorage

if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[]
}


submit.addEventListener('click',function(){

    var newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,        
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()





    }
    if(title.value != '' && price.value!=''&& category.value!='' && newPro.count < 100){
        if(mood == 'create'){
            if(newPro.count>1){
                for(var i =0;i < newPro.count;i++){
                    dataPro.push(newPro);
                }
            }
            else{
                dataPro.push(newPro);
        
            }
        }
        else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML='create';
            count.style.display='block';
        }
        clearForms();
    }
        

    
    
    

    localStorage.setItem('product',JSON.stringify(dataPro));
    addProduct();

    
})












//clear form

function clearForms(){

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    total.style.background='#a00d02'



}





//read product


function addProduct(){
    getTotal()

    var table='';
    for(var i = 0;i<dataPro.length;i++){
        table+=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>

           <td><button onclick="updateProduct(${i})" id="update">update</button></td>

           <td><button onclick="deletProduct(${i})" id="delete">delete</button></td>





        </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;
    var btnDelete = document.getElementById("deleteAll")
    if(dataPro.length>0){
        btnDelete.innerHTML=`<button onclick='deleteAll()'>delete All(${dataPro.length})</button>
        `

    }
    else{
        btnDelete.innerHTML='';
    }
}

addProduct();








//count













//delete


function deletProduct(i){


    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    addProduct();

}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    addProduct();
}

//update

function updateProduct(i){

    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    ads.value=dataPro[i].ads;
    taxes.value=dataPro[i].taxes;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none'
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood = 'update';
    tmp = i;
    
    scroll({top:0,
        behavior:'smooth'
           
    
    })

       
      
}










//search
var searchMood = 'title';
function getSearchMood(id){
    var search = document.getElementById('search');
      if(id == 'searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood="category";
    }
    search.placeholder = 'Search By '+searchMood;


search.focus();
search.value='';
addProduct();

}


function searchData(value){

    var table = '';
    for(var i =0; i<dataPro.length;i++){

    if(searchMood == 'title'){
        
            if(dataPro[i].title.includes(value.toLowerCase())){


                table+=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>

        <td><button onclick="deletProduct(${i})" id="delete">delete</button></td>





      </tr>`;
                
            
        }





    }
    else{
        

       
            if(dataPro[i].category.includes(value.toLowerCase())){


                table+=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProduct(${i})" id="update">update</button></td>

        <td><button onclick="deletProduct(${i})" id="delete">delete</button></td>





      </tr>`;
                
          
        }
    }
    }
    document.getElementById('tbody').innerHTML=table;

}







//clean data