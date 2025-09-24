import { useAppSelector , useAppDispatch } from "@/store";
import { RootState } from "@/store";
import { clearCart } from "@/store/features/cartSlice";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cashier = () => {
  const {toast} = useToast()
  const totalCost = useAppSelector((state: RootState) =>
    state.Cart.items.reduce((total, item) => total + item.cost, 0)
  );
const dispatch = useAppDispatch()
const handleClearCart = ()=>{
    dispatch(clearCart());
    toast({
      title: "Cashier View",
      description: (
          <p>Your order is successfully</p>
      ),
      })
}
  return (
    <div className="container flex justify-center items-start py-10 p-10 mt-20  ">
      <div className="w-full max-w-sm  p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Subtotal</span>

          <span>${totalCost}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Tax (10%)</span>
          <span>${(totalCost * 0.1).toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Shipping Fee</span>
          <span>$20.00</span>
        </div>

        <div className="flex justify-between text-lg font-semibold mb-6">
          <span>Order Total</span>
          <span>${totalCost + totalCost * 0.1 + 20.0}</span>
        </div>

        <Link to="/products">
          <button onClick={()=> handleClearCart()} className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            Pay Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cashier;
