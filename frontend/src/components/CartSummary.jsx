import React, { useEffect, useState } from "react";
import Back from "./Back";
import { useCart } from "../context/cartContext";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

function CartSummary() {
  const { cart, clearCart, updateQty } = useCart();
  const [foodInfo, setFoodInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length > 0) {
      // eslint-disable-next-line react-hooks/immutability
      fethFoodDetails(cart);
    }
  }, [cart]);

  async function fethFoodDetails(item) {
    const res = await axios.get("/api/food/byId", {
      params: {
        foodIds: item.map((e) => e.foodId),
        quantity: item.map((e) => e.quantity),
      },
      withCredentials: true,
    });

    setFoodInfo(res.data.foodItem);
  }

  const subTotal = foodInfo.reduce((total, item) => {
    const cartItem = cart.find((c) => c.foodId === item._id);
    const quantity = cartItem?.quantity ?? 0;

    return total + item.price * quantity;
  }, 0);

  function handleNext() {
    setTimeout(() => {
      navigate("/home");
    }, 1000);
    alert("yay, your oder placed");
    clearCart();
  }

  return (
    <div className=" h-full w-full  bg-linear-to-b from-[#061523] to-[#071827] overflow-auto px-3 pb-25">
      <Back />
      <h1 className="mt-3 text-2xl">Order Summary</h1>

      {foodInfo.length > 0 ? (
        foodInfo.map((i) => {
          const cartItem = cart.find((c) => c.foodId === i._id);
          if (!cartItem) return null;
          const quantity = cartItem?.quantity;


          return (
            <div key={i._id} className="flex w-full gap-5 mt-10 border-b">
              <div className="border h-37 w-30">
                <video src={i.video}></video>
              </div>

              <div className="flex flex-col w-full gap-5 h-50">
                <span className="text-[19px]">{i.name}</span>
                <span className="pt-2 border-t border-dashed">{i.price}</span>
                <div className="flex justify-between pt-2 border-t border-dashed ">
                  <span>Quantity : {quantity}</span>
                  <div className="flex items-center justify-between w-25">
                    <button
                      className="w-full border"
                      onClick={() => updateQty(i._id, quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="w-full border"
                      onClick={() => updateQty(i._id, quantity - 1)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <span className="pt-2 border-t border-dashed ">
                  total : Rs.{i.price * quantity}
                </span>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
        {foodInfo.length > 0 && (
          <div className="fixed w-[93.5%] bottom-5">
        <span className="text-[16px]">Subtotal : Rs.{subTotal}</span>
        <button
          className="w-full py-3 bg-amber-50/5 backdrop-blur-3xl rounded-2xl"
          onClick={() => handleNext()}
        >
          confirm
        </button>
      </div>
      )}
      {foodInfo.length === 0 && (
        <div className="">no food in cart</div>
      )}

      
    </div>
  );
}

export default CartSummary;
