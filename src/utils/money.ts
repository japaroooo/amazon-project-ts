
function moneyFormat(value: number): number {
   value = Math.round(value)
   return Number((value * 0.01).toFixed(2))
}

export default moneyFormat