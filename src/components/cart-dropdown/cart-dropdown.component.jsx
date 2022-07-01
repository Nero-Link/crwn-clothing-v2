import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

// const sleep = (milliseconds) => {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if (new Date().getTime() - start > milliseconds) {
//       break;
//     }
//   }
// };

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  // const [temp, setTemp] = useState("A");
  // const [count, setCount] = useState(0);

  // const hundredCount = useMemo(() => {
  //   console.log("start");
  //   sleep(2000);
  //   console.log("end");
  //   return 100 + count;
  // },[count]);

  // const val = hundredCount();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
    // console.log(temp);
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {/* {hundredCount} */}
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
      {/* <Button onClick={() => setCount(count + 1)}>CHECKOUT</Button> */}
      {/* <Button onClick={() => setTemp("B")}>CHECKOUT</Button> */}
    </CartDropdownContainer>
  );
};

export default CartDropdown;
