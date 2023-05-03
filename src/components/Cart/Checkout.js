import classes from './Checkout.modal.css';

const CheckOut = (props) => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Your Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
      <label htmlFor="housenum">Your House Number</label>
      <input type="text" id="housenum" />
    </div>
    <div className={classes.control}>
    <label htmlFor="tel">Your Phone Number</label>
    <input type="text" id="tel" />
  </div>
  <button type="button" onClick={props.onCancel}>Cancel</button>
  <button>Submit</button>
    </form>
  );
};

export default CheckOut;
