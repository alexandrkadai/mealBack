import { useContext, useState, Fragment } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsEmpty(false);
  };

  const submitOrderHandler = async (userData) => {
    //User Reminder that everithing goes ok
    setIsSubmitting(true);
    await fetch('https://test12-a8f65-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
    });
    //Make a check of response if error catch if OK the setIsSubmitting to true
    setIsSubmitting(false);
    //Submission done show user message window
    setSubmitDone(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttonModal = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isEmpty ? (
        <CheckOut onCancel={props.onClose} onSubmitForm={submitOrderHandler} />
      ) : (
        <p>Nothing</p>
      )}
      {isEmpty ? buttonModal : ''}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order To Delivery Service. Thank You :)</p>;

  const submitDoneModal = <p>Order Have Send, wait for a call.</p>;

    if(submitDone){
      setTimeout(() =>{
        setSubmitDone(false);

      }, "2000");
    }
  
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitDone && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting &&  submitDone && submitDoneModal}
    </Modal>
  );
};

export default Cart;
