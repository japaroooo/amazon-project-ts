import { OrderDataReceived } from '../../../data/backend-project.ts'
import order from '../../../data/order.ts'
import { fetchProducts, getProduct } from '../../../data/products.js'
import * as dateFormatJs from '../../utils/date-format.ts'
import { getElement } from '../../utils/get-element.ts'

const url = new URL(window.location.href)
const urlOrderId: any = url.searchParams.get('orderId')
const currOrder = order.getOrder(urlOrderId)

async function renderTrackingPage() {
   await fetchProducts()
   let generateHtml = ''

   generateHtml +=
      `
         <main class='tracking-wrapper'>
            <section>Ordered on ${dateFormatJs.changeDateFormat(currOrder.orderTime)}</section>
            <section class='item-container'>
               ${productsList(currOrder.products)}
            </section>
         </main>
      `

   getElement('tracking-order-wrapper').innerHTML = generateHtml

   function productsList(products: OrderDataReceived['products']) {
      let productHTML = ''
      products.forEach((product) => {
         const currentProduct = getProduct(product.productId)
         console.log(currentProduct);
         productHTML +=
            `
               <div class='item'>
                  <div><h3 >${currentProduct.name}</h3></div>
                  <div>Quantity: ${product.quantity}</div>
                  <div> Delivery Time(ETA): <b>${dateFormatJs.changeDateFormat(product.estimatedDeliveryTime)}</b> </div>
                  <button class='primary-button tracking-button'>Track Package</button>
               </div>
            `
      })
      return productHTML
   }
}


renderTrackingPage()

console.log(currOrder);