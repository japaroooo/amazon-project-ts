import { fetchProducts, products } from '../data/products.js';
import cart from '../data/cart-class.ts';
import { getElement as getHTMLElement } from './utils/get-element.ts';


// loadProducts(renderProducts)
fetchProducts(renderProducts)

export function renderProducts() {
   let generateHTML = ''

   products.forEach((product) => {
      generateHTML += `
         <div class='product-container' data-product-id='${product.id}'>

            <div>
               <h3 class='product-name'>${product.name}</h3>
            </div>
               
            <div class='product-rating-container'> 
               <div> Star: ${product.rating.stars} </div>
               <div> Rating: ${product.rating.count} </div>
            </div>
               
               
            <select class='js-quantity-selector-${product.id}'>
               <option selected value='1'>1</option>
               <option value='2'>2</option>
               <option value='3'>3</option>
               <option value='4'>4</option>
               <option value='5'>5</option>
            </select>
            <h3 class='product-price'>${product.getPrice()}</h3>
               

            <div>
               <div class='added-to-cart'>✔ Added</div>
               <button class='add-cart primary-button' data-product-id='${product.id}'>Add to Cart</button>
            </div>
         </div>
         `;
   });

   getHTMLElement('products-grid').innerHTML = generateHTML;

   document.querySelectorAll<HTMLButtonElement>('.add-cart').forEach((button, index: number) => {
      button.addEventListener('click', () => {

         const { productId } = button.dataset;
         const itemQuantity = getHTMLElement(`js-quantity-selector-${productId}`)

         // @ts-ignore
         cart.addToCart(+itemQuantity.value, productId);
         showAddCheck(index);
         getHTMLElement('js-cart-quantity').innerHTML = cart.updateCartQuantity()
         itemQuantity.selectedIndex = 0;
      });
   });


   function showAddCheck(index: number) {
      const addCheck = document.querySelectorAll('.added-to-cart')[index]
      addCheck.classList.add('show-added-to-cart');
      setTimeout(() => {
         addCheck.classList.remove('show-added-to-cart');
      }, 2000);
   }

   getHTMLElement('js-cart-quantity').innerHTML = cart.updateCartQuantity()
}

