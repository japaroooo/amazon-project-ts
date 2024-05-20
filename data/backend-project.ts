import { CartContents } from './cart-class.ts';
import order from './order.ts';

type ProductsReceived = {
   productId: string
   quantity: number
   estimatedDeliveryTime: string
   variation: string | null
}

export interface OrderDataReceived {
   id: string
   orderTime: string
   totalCostCents: number
   products: ProductsReceived[]
}

async function placeOrder(data: CartContents[]) {
   try {

      const response = await fetch('https://supersimplebackend.dev/orders', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            cart: data
         })
      })

      const place_order: OrderDataReceived = await response.json()
      order.addOrder(place_order)

      window.location.href = 'src/features/orders/orders.html'
   } catch (error) {
      console.log(error);
      return
   }
}

export { placeOrder }   