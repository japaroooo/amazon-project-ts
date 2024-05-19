import { renderOrderSummary } from './order-summary-class.ts';
import { renderPaymentSummary } from './payment-summary-class.ts';
import { renderHeader } from './checkout-header-class.ts';
import { fetchProducts } from '../../../data/products.ts';
import '../../data/backend-project.js'
import cart from '../../../data/cart-class.ts';


async function loadPage() {
   try {

      console.log('Page loaded');

      await Promise.allSettled([
         fetchProducts(),
         cart.fetchCart()
      ])

      // await new Promise((resolve) => {
      //    cart.loadCart(() => resolve())
      // })

      renderHeader()
      renderOrderSummary()
      renderPaymentSummary()
      console.log('Checkout loaded');
   } catch (error) {
      console.log(error);
   }
}

loadPage()


// Promise.allSettled([
//    fetchProducts(),
//    new Promise((resolve, reject) => {
//       cart.loadCart(() => resolve('Cart loads successfully'))
//    })
// ]).then((value1) => {

//    renderHeader()
//    renderOrderSummary()
//    renderPaymentSummary()
// })


// new Promise((resolve) => {
//    cart.loadCart(() => resolve())
// }).then(() => {
//    return new Promise((resolve) => {
//       loadProducts(() => resolve())
//    })
// }).then(() => {
//    renderHeader()
//    renderOrderSummary()
//    renderPaymentSummary()
// })