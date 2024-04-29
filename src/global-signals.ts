import { Signal } from 'signal-polyfill'

type Product = {
  id: number
  name: string
  price: number
  count: number
}

type Cart = Array<Product>

const initialCart = [
  {
    id: 1,
    name: 'Apple',
    price: 1.5,
    count: 1,
  },
  {
    id: 2,
    name: 'Banana',
    price: 0.5,
    count: 5,
  },
  {
    id: 3,
    name: 'Cherry',
    price: 2.5,
    count: 3,
  },
]

export const cart = new Signal.State<Cart>(initialCart)

export const total = new Signal.Computed<number>(() =>
  cart.get().reduce((acc, curr) => acc + curr.price * curr.count, 0),
)

const initialDiscount = 0.3

export const discount = new Signal.State<number>(initialDiscount)

export const grandTotal = new Signal.Computed<number>(
  () => total.get() * (1 - discount.get()),
)
