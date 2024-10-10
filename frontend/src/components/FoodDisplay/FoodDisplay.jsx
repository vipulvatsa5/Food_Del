import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/storeContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => { // Default to "Salad"
    const { food_list } = useContext(StoreContext); // Ensure you're using food_list


    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    food_list.map((item , index) => {
                        if(category === "All" || category === item.category){
                            return <FoodItem 
                            key={index} 
                            id={item._id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            image={item.image} 
                        />
                        }
                    })
                }
            </div>
        </div>
    );
};

export default FoodDisplay;
