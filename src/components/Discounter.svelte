<script>
  import { effect } from '../effect'
  import { discount } from '../global-signals'

  const increaseDiscount = () => {
    discount.set(discount.get() + 0.1)
  }

  const decreaseDiscount = () => {
    discount.set(discount.get() - 0.1)
  }

  let discountValue = discount.get()

  effect(() => {
    discountValue = discount.get()
  })
</script>

<h1 class="text-3xl font-bold mb-10">Discounter</h1>
<div class="mb-5">
  Discount: {(discountValue * 100).toFixed(0)}%
</div>
<div class="flex gap-3">
  <button
    on:click={decreaseDiscount}
    class="px-4 py-2 bg-red-500 text-white rounded"
  >
    (-) Discount
  </button>
  <button
    on:click={increaseDiscount}
    class="px-4 py-2 bg-green-500 text-white rounded"
  >
    (+) Discount
  </button>
</div>
