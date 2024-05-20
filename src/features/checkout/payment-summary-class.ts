order
import cart from '../../../data/cart-class.js';
import { getDeliveryOption } from '../../../data/delivery-options.mjs';
import { getProduct } from '../../../data/products.js';
import moneyFormat from '../../utils/money.js';
import { placeOrder } from '../../../data/backend-project.js';
import { getElement } from '../../utils/get-element.js';
import order from '../../../data/order.js';

// renderPaymentSummary()

export function renderPaymentSummary() {
   let paymentSummaryHTML = ''
   let itemsPrice = 0
   let shippingFee = 0

   cart.cartItems.forEach((cartItem) => {
      const matchingProduct = getProduct(cartItem.productId)
      itemsPrice += (cartItem.quantity * (matchingProduct.priceCents))

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
      shippingFee += deliveryOption.priceCents
   });

   const totalBeforeTax = shippingFee + itemsPrice
   const estimatedTax = totalBeforeTax * 0.1
   const totalPrice = totalBeforeTax + estimatedTax

   paymentSummaryHTML =
      `
         <div class="payment-summary-row">
            <b class='payment-title'>Order Summary</b>
         </div>

         <div class='payment-summary-row'>
            <div>Items (${cart.updateCartQuantity()}):</div>
            <div>$${moneyFormat(itemsPrice)}</div>
         </div>

         <div class='payment-summary-row'>
            <div>Shipping & handling:</div>
            <div>
               <div class='shipping-price'> ${shippingFee ? '$' + moneyFormat(shippingFee) : 'Free'}</div> 
            </div>
         </div>

         <div class='payment-summary-row'>
            <div>Total before tax:</div>
            <div>
               $<div class='total-before-tax'>${moneyFormat(totalBeforeTax)}</div>
            </div>
         </div>

         <div class='payment-summary-row'>
            <div>Estimated tax:</div>
            <div>
               $<div class='estimated-tax'>${moneyFormat(estimatedTax)}</div>
            </div>
         </div>

         <div class='payment-summary-row'>
            <div><b>Total Price:</b></div>
            <div>
              $<div class='total-price'><b>${moneyFormat(totalPrice)} </b></div>
            </div>
         </div>

         <button class='primary-button js-order-button'>Place Order</button>       
         `

   getElement('js-payment-summary').classList.add('card')
   getElement('js-payment-summary').innerHTML = paymentSummaryHTML

   getElement('js-order-button').addEventListener('click', async () => {
      await placeOrder(cart.cartItems)
   })

}

