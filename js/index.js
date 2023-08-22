let ulFirst = document.getElementsByClassName('list-content')[0];
let cartList = document.getElementsByClassName('finaliza-cart')[0];
//criação dos produtos da vitrine pelo DOM
function createProducts(data){
      for(let i = 0; i < data.length; i++){
            let liProducts = document.createElement('li'); //criação da (li)
            ulFirst.appendChild(liProducts);
            liProducts.setAttribute('class','product');

            let productImg = document.createElement('img'); //criação da (img)
            productImg.src = data[i].img; 
            productImg.setAttribute('class','product-img');
            liProducts.appendChild(productImg);

            let productMain = document.createElement('main'); //criação da (main)
            liProducts.appendChild(productMain);
            productMain.setAttribute('class','product-main');

            let productTag = document.createElement('h4'); //criação da tag (h4)
            productTag.innerText = `${data[i].tag}`;
            productMain.appendChild(productTag);

            let productName = document.createElement('h2'); //criação do nome do produto (h2)
            productName.innerText = `${data[i].nameItem}`;
            productMain.appendChild(productName);

            let productDescription = document.createElement('p'); //criação da descrição do produto (p)
            productDescription.innerText = `${data[i].description}`;
            productMain.appendChild(productDescription);

            let productPrice = document.createElement('strong'); //criação do preço do produto (strong)
            productPrice.innerText = `R$ ${data[i].value}`;
            productMain.appendChild(productPrice);  

            let productAddCart = document.createElement('a');   //criação do botão de adição ao carrinho (a)
            productAddCart.innerText = `${data[i].addCart}`;
            productMain.appendChild(productAddCart);
            productAddCart.setAttribute('href','#');
            productAddCart.setAttribute('class','productButton');
            productAddCart.id = `car_${data[i].id}`;               
      }  
  }


//   filtr de produtos
let newData = []; 
function filterProducts(data) {
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
}

filterProducts(data);
createProducts(data);


let cartCount = 0;  
let cartTotalArr = []; 
let cartTotal = 0;

let botoesProduto = document.getElementsByClassName('productButton');    
//evento listener que capta clique no botão de compra
  for(let i = 0; i < botoesProduto.length ; i++){  
  
      let botao = botoesProduto[i];   

      botao.addEventListener('click', function(event){ 
        
          let idElemento = event.target.id;                                       
          let id = parseInt(idElemento.substring(4));                             
          let cart = procuraObjeto(id);                                          
    
          if(cart == false){                                                 
            alert('Você pode adicionar apenas uma unidade de cada produto');  
          }else{  
                if(verificaFavorito(cart.id) == false){                        
                    insereFavorito(cart);                                         
                }else{
                  alert('O produto já foi adicionado');                         
                }
          }
      });   
  }


  
 //função que verifica se produto já foi adicionado 
  function verificaFavorito(id){ 

      let elemento = document.getElementById(`fav_${id}`); 

      if(elemento == null){                                                       
          return false;                                                        
      }else{
          return true;                                                           
      }
  }


 //função que verifica se produto id do produto é valido 
  function procuraObjeto(id){ 
                                                
      for(let i = 0; i < data.length ; i++){   
          let cart = data[i];                                                
          if(cart.id == id){                                                
              return cart;                                                 
          }
      }
      return false;                                                             
  }

//função que adiciona produtos do cart
function insereFavorito(cart){                                   
    cartCount++;   
    cartTotal += cart.value;

    document.querySelector('#cartQuantidade').innerHTML = `${cartCount}`; 
    document.querySelector('#cartTotal').innerHTML = `${cartTotal}`; 
          

    //Refêrenciou um item já presente na tela
    let listaCarrinho = document.querySelector('.produtos-carrinho');      

          //Criando os itens
    let li = document.createElement('li');                                 
    let img = document.createElement('img');
    let main = document.createElement('main');
    let h3 = document.createElement('h3');                                  
    let strong = document.createElement('strong')  
    let button = document.createElement('a');                     
      
          //Configurando os itens
    li.id=`item_${cart.id}`;                                              
    img.src = cart.img;
    h3.innerText = `${cart.nameItem}`;                                     
    strong.innerHTML = `R$ ${cart.value}`;
    button.innerHTML = 'Remover do carrinho';                                          
    button.id = `fav_${cart.id}`;                                         
    button.classList.add('favoriteButton');  
    button.setAttribute('href','#')                              
  
    button.addEventListener('click', function(event){                      
        let li = document.getElementById(`item_${cart.id}`);              
        li.remove();                                                       
                
        cartCount--; 
        cartTotal -= cart.value;

        if(cartCount == 0){
            cartList.classList.toggle('none');
        }

         
            
        document.querySelector('#cartQuantidade').innerHTML = `${cartCount}`; 
        document.querySelector('#cartTotal').innerHTML = `${cartTotal}`; 
    });

    let buttonAdd = document.getElementById(`car_${cart.id}`);
    buttonAdd.addEventListener('click', function(event){
        if(cartCount == 0){
            cartList.classList.add('none');
        }else if(cartCount > 0){
            cartList.classList.remove('none');

        }
    })
      

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

}

