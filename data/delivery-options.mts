type DeliveryID = '1' | '2' | '3'

interface DeliveryOption {
   id: DeliveryID
   priceCents: number
   deliveryDays: number
}

const deliveryOptions: Required<DeliveryOption[]> = [
   {
      id: '1',
      priceCents: 0,
      deliveryDays: 7,

   },
   {
      id: '2',
      priceCents: 499,
      deliveryDays: 3,

   },
   {
      id: '3',
      priceCents: 899,
      deliveryDays: 1,

   }
]



function getDeliveryOption(deliveryOptionId: string) {
   // @ts-expect-error
   const accumulator = (acc, curr) => {
      acc[curr.id] = curr
      return acc
   }

   const deliveryOption = deliveryOptions.reduce(accumulator, {})
   return deliveryOption[deliveryOptionId]
}

export { deliveryOptions, getDeliveryOption }