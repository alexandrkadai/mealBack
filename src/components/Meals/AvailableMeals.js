import { useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://test12-a8f65-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
      const responseData = await response.json();
      const loadedMeals 
    };
    fetchMeals();
  }, []);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
