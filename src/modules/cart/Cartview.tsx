import { useAppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store"; 
import { increaseQuantity, decreaseQuantity, cartItem, removeFromCart } from "@/store/features/cartSlice";
import flower from "@/assets/images/flowers.jpg"
import { Link } from "react-router-dom";
import api from "@/api";
import { SaleRecordPayload } from "@/api/allsalereports/types";


const CartView = () => {

    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state: RootState) => state.Cart.items);

    console.log(cartItems)

    const handleRemoveItem = (productID: number) => {
        dispatch(removeFromCart(productID));
    };
    
    const handleIncreaseQuantity = (item: cartItem) => {
    dispatch(increaseQuantity(item) );
    };

    const handleDecreaseQuantity = (item: cartItem) => {
        if (item.quantity > 1) {
          dispatch(decreaseQuantity(item));
        }
      };
    
    const {mutate:addSaleRecord} = api.sale.addSaleRecord.useMutation({
    })  

    const handleSaleRecord = async () => {
      try {
        await Promise.all(
          cartItems.map(item => {
            const dataPayload: SaleRecordPayload = {
              productID: item.productID,
              quantity: item.quantity,
            };
            return addSaleRecord(dataPayload); 
          })
        );
        alert("All sale records added successfully!");
      }
      catch(error){
        alert("Error occurs ")
      }
    };


    return (
    <>
    <div className="container p-10 flex h-screen justify-center mt-20  ">
    <div className="w-full max-w-4xl items-center  ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>
        {cartItems.length == 0 ? (
            <div  className="text-center text-gray-500">
            <p>Your cart is empty.</p>
          </div>
        ):(
        <div >
          <table className="mx-auto">
          {cartItems.map((item:cartItem) => {
            return(
              <tr className="border-b mb-3"
              >
              <td className="flex items-center gap-10">
                <img
                  src={flower}
                  alt="Product image"
                  className="w-20 h-20 object-cover "
                />

                <td className="flex-1 mr-15">
                  <p className="text-lg font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">{item.sellingPrice}</p>
                </td>

                <td className="flex items-center space-x-4 mr-15">
                  <button
                  onClick={()=> handleDecreaseQuantity(item)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick = {() => handleIncreaseQuantity(item) }
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                </td>

                <td className="ml-3">
                  <p className="text-lg font-semibold text-gray-700">Cost: ${item.cost}</p>
                </td>
                <button
                  onClick={()=>handleRemoveItem(item.productID)}
                  className="ml-20 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
              </tr>
            )
          }
          )}
        
        </table>
       
        <div className="flex justify-center mt-6">
            <Link to='/cashier'>
            <button
              className="py-2 px-8 bg-indigo-300 text-white rounded-lg hover:bg-indigo-500 disabled:bg-gray-300"
              onClick={()=> handleSaleRecord()}
            >
              Go to Cashier
            </button>
            </Link>
        </div>
    </div>
        )
        }
      
       

        
      </div>
    </div>
    </>
  )
}

export default CartView