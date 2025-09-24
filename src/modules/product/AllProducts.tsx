import api from "@/api";
import flower from "@/assets/images/flowers.jpg";
import cart from "@/assets/images/cart.png";
import {
  addToCart,
  cartItem,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { Product } from "@/shared/types";

const AllProducts = () => {
  const { data } = api.product.getAllProducts.useQuery({
    notifyOnChangeProps: "all",
  });

  const cartItems = useAppSelector((state: RootState) => state.Cart.items);
 
  const totalCount = useAppSelector((state: RootState) =>
    state.Cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  const handleIncreaseQuantity = (item: cartItem) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecreaseQuantity = (item: cartItem) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else if (item.quantity === 1) {
      dispatch(removeFromCart(item.productID));
    }
  };

  return (
    <section className=" mx-auto  p-10  h-full">
      <div className=" fixed mt-20 right-5 flex flex-warp items-center text-white px-4 ">
        <Link to="/cartview">
          <img src={cart} alt="" className="h-10 w-10 object-cover" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount ?? 0}
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-4 mt-20 w-full flex-wrap gap-2">
        {data?.map((product) => {
          const choiceItem = cartItems.find(
            (item) => item.productID === product.productID
          );
          const choiceQuantity = choiceItem && choiceItem.quantity > 0;
          return (
            <div
              key={product.productID}
              className="p-6 rounded overflow-hidden shadow-lg"
            >
              <img
                src={flower}
                alt=""
                className="h-40 object-cover rounded-xl"
              />
              <div className="flex flex-row justify-between items-center p-2 mt-5 mb-5">
                <h2 className="font-bold text-lg">{product.productName}</h2>
                <span className="text-xl font-semibold">
                  ${product.sellingPrice}
                </span>
              </div>

              {choiceQuantity ? (
                <div className="flex items-center justify-center gap-4 mb-3">
                  <button
                    onClick={() => handleDecreaseQuantity(choiceItem)}
                    className="px-3 py-2 bg-indigo-200 hover:bg-indigo-300 rounded-lg"
                  >
                    -
                  </button>
                  <span>{choiceItem.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(choiceItem)}
                    className="px-3 py-2 bg-indigo-200 hover:bg-indigo-300 rounded-lg"
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-2 bg-indigo-200 hover:bg-indigo-300 rounded-lg"
                  >
                    Add to Cart
                  </button>
                  <button className="px-3 py-2 bg-indigo-200 hover:bg-indigo-500 rounded-lg">
                    View Detail
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;
