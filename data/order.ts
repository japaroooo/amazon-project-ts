import { OrderDataReceived } from "./backend-project.ts";

class Order {

   // @ts-ignore
   orders: Storage = JSON.parse(localStorage.getItem('orders')) || []

   addOrder(order: OrderDataReceived) {
      this.orders.unshift(order)
      this.saveToStorage()
   }

   saveToStorage() {
      try {
         localStorage.setItem('orders', JSON.stringify(this.orders))
         console.log('Order save in Storage');
      } catch (error) {
         console.log(error);
         return
      }
   }

   getOrder(orderId: string) {
      const accumulator = (acc: any, curr: any) => {
         acc[curr.id] = curr
         return acc
      }

      let matchingOrder = this.orders.reduce(accumulator, {})

      console.log(matchingOrder);
      return matchingOrder[orderId]
   }
}
const order = new Order()
export default order


