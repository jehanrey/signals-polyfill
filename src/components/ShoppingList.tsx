import { useEffect, useRef } from 'react'

import useSignal from '../hooks/useSignal'
import useComputed from '../hooks/useComputed'
import { cart, discount, total, grandTotal } from '../global-signals'
import { effect } from '../effect'

const AddProduct = ({ name, price }: { name: string; price: number }) => {
  const [cartItems, setCartItems] = useSignal(cart)
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white"
      onClick={() => {
        const productIndex = cartItems.findIndex(
          (c) => c.name === name && c.price === price,
        )
        const newItem =
          productIndex > -1
            ? {
                ...cartItems[productIndex],
                count: cartItems[productIndex].count + 1,
              }
            : {
                id: cartItems.length + 1,
                name,
                price,
                count: 1,
              }
        const newCart =
          productIndex > -1
            ? cartItems.toSpliced(productIndex, 1, newItem)
            : [...cartItems, newItem]
        setCartItems(newCart)
      }}
    >
      Add {name}
    </button>
  )
}

const CartList = () => {
  const [cartItems] = useSignal(cart)
  const totalAmount = useComputed(total)
  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">Shopping List</h1>
      <div className="mb-5 grid auto-cols-max grid-cols-[3fr_3fr_2fr_2fr] gap-2 border-b-2 border-b-gray-700">
        <div>Item</div>
        <div>Price</div>
        <div>Count</div>
        <div>Total</div>
      </div>
      {cartItems.map((item) => (
        <div
          className="grid auto-cols-max grid-cols-[3fr_3fr_2fr_2fr] gap-2"
          key={item.id}
        >
          <div>{item.name}</div>
          <div>${item.price.toFixed(2)}</div>
          <div>{item.count}</div>
          <div>${(item.price * item.count).toFixed(2)}</div>
        </div>
      ))}
      <div className="mt-5 flex gap-2 border-t-2 border-t-gray-700">
        <div className="flex-[0.9]">Total</div>
        <div className="flex-[0.1]">{totalAmount.toFixed(2)}</div>
      </div>
    </>
  )
}

const Discount = () => {
  const discountRef = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      effect(() => {
        if (discountRef.current) {
          discountRef.current.innerText = `${(discount.get() * 100).toFixed(0)}%`
        }
      }),
    [],
  )
  return (
    <div className="mt-5 flex gap-2">
      <div className="flex-[0.3]">Discount</div>
      <div className="flex-[0.3]" ref={discountRef} />
    </div>
  )
}

const GrandTotal = () => {
  const grandTotalRef = useRef<HTMLDivElement>(null)
  useEffect(
    () =>
      effect(() => {
        if (grandTotalRef.current) {
          grandTotalRef.current.innerText = `${grandTotal.get().toFixed(2)}`
        }
      }),
    [],
  )
  return (
    <div className="mt-5 flex gap-2 border-t-2 border-t-gray-700">
      <div className="flex-[0.9] font-bold">Grand Total</div>
      <div className="flex-[0.1]" ref={grandTotalRef} />
    </div>
  )
}

const ShoppingList = () => {
  return (
    <>
      <div>
        <CartList />
        <Discount />
        <GrandTotal />
      </div>
      <div className="mt-5 flex gap-3">
        <AddProduct name="Apple" price={2.5} />
        <AddProduct name="Banana" price={0.5} />
        <AddProduct name="Cherry" price={2.5} />
      </div>
    </>
  )
}

export default ShoppingList
