import { ProductDetails } from "./products"

export interface CartContents {
   quantity: number
   productId: string
   deliveryOptionId: string
}

class Cart {

   cartItems: CartContents[] = []
   #localStorageKey

   constructor(localStorageKey: string) {
      this.#localStorageKey = localStorageKey
      this.loadFromStorage()
   }

   loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)!)

      if (!this.cartItems) {
         this.cartItems = [{
            quantity: 3, productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', deliveryOptionId: '1'
         },
         {
            quantity: 1, productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', deliveryOptionId: '2'
         }];
      }
   }

   saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
   }

   addToCart(itemQuantity: number = 1, productId: ProductDetails['id']) {
      let matchingProduct: CartContents

      this.cartItems.forEach((product) => {
         if (product.productId === productId) {
            matchingProduct = product;
         }
      });

      // @ts-ignore
      if (matchingProduct) {
         matchingProduct.quantity += itemQuantity;
      } else {
         this.cartItems.push({ quantity: itemQuantity, productId, deliveryOptionId: '1' });
      }

      this.saveToStorage()
   }

   updateCartQuantity() {
      return this.cartItems.reduce((currentSum, item) => item.quantity + currentSum, 0)
   }

   calculateCartQuantity(inputValue: number, productId: ProductDetails['id']) {

      this.cartItems.forEach(cartItem => {
         if (productId === cartItem.productId) {
            cartItem.quantity = inputValue
         }
      })

      this.saveToStorage()
   }

   removeFromCart(productId: ProductDetails['id']) {
      // let newCart = []

      // this.cartItems.forEach(item => {
      //    if (item.productId !== productId) {
      //       newCart.push(item)
      //    }
      // })

      // this.cartItems = newCart
      this.cartItems.filter((cartItem => cartItem.productId === productId))
      this.saveToStorage()
   }

   updateDeliveryOption(productId: ProductDetails['id'], deliveryOptId: number) {
      let matchingProduct

      this.cartItems.forEach((product) => {
         if (product.productId === productId) {
            matchingProduct = product;
         }
      });

      if (!matchingProduct) return

      //@ts-ignore
      matchingProduct.deliveryOptionId = deliveryOptId
      this.saveToStorage()
   }

   loadCart(fun: FunctionConstructor) {
      const xhr = new XMLHttpRequest()

      try {
         xhr.addEventListener('load', () => {
            console.log(xhr.response);

            fun()
         })

         xhr.open('GET', 'https://supersimplebackend.dev/cart')
         xhr.send()

      } catch (error) {
         console.error(error);
      }
   }

   fetchCart() {
      try {
         const cartPromise = fetch('https://supersimplebackend.dev/cart')
            .then((response) => response)

         console.log('Cart loaded');
         return cartPromise
      } catch (error) {
         console.error(error);
      }
   }
}

let cart = new Cart('cart-class')

export default cart