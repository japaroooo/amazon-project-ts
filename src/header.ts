import { getElement } from "./utils/get-element.ts";


getElement('header').innerHTML =
   `
      <section><a href="/index.html" class="amazon-link">Amazon</a></section>
      <section class="middle-section">
         <input type="text" placeholder="Search" class="search-input" />🔎
      </section>
      <section class="right-section">
         <a href="/src/features/orders/orders.html" class="order-link"
            ><span>Returns</span><span>& Orders</span></a
         >
         <a href="/src/features/checkout/checkout.html" class="cart-link">
            <span class="js-cart-quantity"></span><span>Cart</span></a
         >
      </section>
   `



