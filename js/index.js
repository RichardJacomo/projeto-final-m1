let ulFirst = document.getElementsByClassName('list-content')[0];
let cartList = document.getElementsByClassName('finaliza-cart')[0];

function createProducts(data) {
    let productsHTML = '';
    for (let i = 0; i < data.length; i++) {
      productsHTML += `
        <li class="product">
          <img class="product-img" src="${data[i].img}" />
          <main class="product-main">
            <h4>${data[i].tag}</h4>
            <h2>${data[i].nameItem}</h2>
            <p>${data[i].description}</p>
            <strong>R$ ${data[i].value}</strong>
            <a href="#" class="productButton" id="car_${data[i].id}">${data[i].addCart}</a>
          </main>
        </li>
      `;
    }
    ulFirst.insertAdjacentHTML('beforeend', productsHTML);
  }

let newData = []; 
function filtraProductos(data) {
    let input = document.querySelector('.filtro');
    let button = document.querySelector('.pesquisar-button');

    button.addEventListener('click', function (e) {
        e.preventDefault();  
        let searchText = input.value.toLowerCase();
        let liProducts = document.querySelectorAll('.product'); 
       
        liProducts.forEach(product => {
            product.remove();
        });

        if (searchText.trim() === '') {
            createProducts(data);
        } else {
            newData = data.filter(element =>
                element.nameItem.toLowerCase().includes(searchText)
            );
        createProducts(newData);
        }
    });

    let ulMenu = document.getElementsByClassName('menu-list')[0];
    ulMenu.addEventListener('click', function (event) {
        if (event.target.classList.contains('menu-item')) {
            event.preventDefault();
            let searchText = event.target.text.toLowerCase();
            let liProducts = document.querySelectorAll('.product'); 
        
            liProducts.forEach(product => {
                product.remove();
            });

            if (searchText.trim() === '' || searchText.trim() === 'todos') {
                createProducts(data);
            } else {
                newData = data.filter(element =>
                    element.tag.toLowerCase().includes(searchText)
                );
            createProducts(newData);
            }
        }
    });
}

filtraProductos(data);
createProducts(data);

let cartCount = 0;  
let cartTotalArr = []; 
let cartTotal = 0;
  
function verificaFavorito(id){ 
    let elemento = document.getElementById(`fav_${id}`); 
    if(elemento == null){                                                       
        return false;                                                        
    }else{
        return true;                                                           
    }
}

function procuraObjeto(id){                                     
    for(let i = 0; i < data.length ; i++){   
        let cart = data[i];                                                
        if(cart.id == id){                                                
            return cart;                                                 
        }
    }
    return false;                                                             
}

function insereFavorito(cart){                                 
    cartCount++;   
    cartTotal += cart.value;
          
    let listaCarrinho = document.querySelector('.produtos-carrinho');      

    let li = document.createElement('li');                                 
    let img = document.createElement('img');
    let main = document.createElement('main');
    let h3 = document.createElement('h3');                                  
    let strong = document.createElement('strong')  
    let button = document.createElement('a');                     
      
    li.id=`item_${cart.id}`;                                              
    img.src = cart.img;
    h3.innerText = `${cart.nameItem}`;                                     
    strong.innerHTML = `R$ ${cart.value}`;
    button.innerHTML = 'Remover do carrinho';                                          
    button.id = `fav_${cart.id}`;                                         
    button.classList.add('favoriteButton');  
    button.setAttribute('href','#')  

    li.appendChild(img);
    li.appendChild(main);                                                    
    main.appendChild(h3);
    main.appendChild(strong);
    main.appendChild(button);                                               
    listaCarrinho.appendChild(li)
    document.querySelector('#quant').innerHTML = 'Quantidade';
    document.querySelector('#total').innerHTML = 'Total';
    let backCart = document.querySelector('.finaliza-cart');
    backCart.style.backgroundColor = "#333333";     
  
    button.addEventListener('click', function(event){                      
        let li = document.getElementById(`item_${cart.id}`);              
        li.remove();                                                       
                
        cartCount--; 
        cartTotal -= cart.value;

        if(cartCount <= 0){
            cartList.classList.add('none');
        }else if(cartCount > 0){
            cartList.classList.remove('none');
        }
        
    });
    
    ulFirst.addEventListener('click', function (event) {
        if (event.target.classList.contains('productButton')) {
            cartList.classList.remove('none');
        }
    });
    document.querySelector('#cartQuantidade').innerText = `${cartCount}`; 
    document.querySelector('#cartTotal').innerText = `R$ ${cartTotal}`; 

}

let botoesProduto = document.getElementsByClassName('productButton');   
function adicionaCarrinho() {
    ulFirst.addEventListener('click', function (event) {
        if (event.target.classList.contains('productButton')) {
            let idElemento = event.target.id;
            let id = parseInt(idElemento.substring(4));
            let cart = procuraObjeto(id);
            if (!verificaFavorito(cart.id)) {
                insereFavorito(cart);
            } else {
                alert('O produto já foi adicionado');
            }
        }
    });
}
adicionaCarrinho();

