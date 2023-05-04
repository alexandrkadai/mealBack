import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === '';
const isNotPostal = (value) => value.trim().lenght !== 5;

const Checkout = (props) => {

  const [formInputVal, setFormInputVal] = useState({
    name: false,
    street: true,
    postal: true,
    city: true,
  });


  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isNotPostal(enteredPostal);

    setFormInputVal({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postal:enteredPostalIsValid
    });

    const formIsValid =
      enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if (!formIsValid) {
        console.log('Not Succsesssdcsf');
      return;
    }
    if (formIsValid) {
      console.log('succses');
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputVal.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputVal.name && <p>Please Enter Valid Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
         {!formInputVal.street && <p>Please Enter Valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="number" id="postal" ref={postalInputRef} />
         {!formInputVal.postal && <p>Please Enter Valid postal</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
         {!formInputVal.city && <p>Please Enter Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
