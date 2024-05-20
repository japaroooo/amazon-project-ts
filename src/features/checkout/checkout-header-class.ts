import cart from "../../../data/cart-class"
import { getElement } from "../../utils/get-element"


// renderHeader()

export function renderHeader() {
   let html =
      `
         <section><a href="/main.html">Amazon</a></section>
         <section class="middle-section">Checkout (${cart.updateCartQuantity()} items)</section>
         <section>Lock</section>
      `
   getElement('checkout-header').innerHTML = html
}


