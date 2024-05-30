export function getElement(className: string): any {
   return document.querySelector(`.${className}`)
}

export function getAllElement(className: string): any {
   return document.querySelectorAll(`.${className}`)
}

