import { OrderDataReceived } from '../../../data/backend-project.ts';
import order from '../../../data/order.ts'
import { fetchProducts, getProduct } from '../../../data/products.ts';
import { changeDateFormat } from '../../utils/date-format.ts';
import { getElement } from '../../utils/get-element.ts';
import moneyFormat from '../../utils/money.ts';

fetchProducts(renderOrderPage)

async function renderOrderPage() {
   let generateHtml = ''

   order.orders.forEach((loadOrder: OrderDataReceived) => {
      generateHtml +=
         `
            <div class='card order-box'>        
               <section class='order-info'>
                  <div><span>Total Price</span><h3>$${moneyFormat(loadOrder.totalCostCents)}</h3></div>
                  <div><span>Time Ordered</span><h3>${changeDateFormat(loadOrder.orderTime)}</h3></div>
                  <div><span>Order ID</span><h3>${loadOrder.id}</h3></div>
               </section>
                  
               <section class='order-products'>
                  <div class='products-list'>
                     ${displayProducts(loadOrder.products)}
                  </div>
                  <div>
                     <a href="/src/features/tracking/tracking.html?orderId=${loadOrder.id}">
                        <button class='track-package primary-button'>
                           Track Order
                        </button>
                     </a>
                  </div>
               </section>
            </div>
               
         `
   })


   getElement('order-content').innerHTML = generateHtml

   function displayProducts(products: OrderDataReceived['products']) {
      let html = ''
      products.forEach((product) => {
         const { productId, quantity } = product
         const productName = getProduct(productId)
         html +=
            `             
                  <div>
                     <div> Product Name: <b>${productName.name}</b> </div>
                     <div> Quantity: <b>${quantity}</b> </div>
                  </div>
            `
      })
      return html
   }

}
