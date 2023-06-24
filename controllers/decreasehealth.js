import moment from "moment";
import { Pokemon } from "../models/pokemon.js";


export const decreaseHealthStatus = async () => {
    try {
      const oneMinuteAgo = moment().subtract(1, 'minute').toDate();
  
      const pokemonsToDecrease = await Pokemon.find({
        lastFed: { $lt: oneMinuteAgo },
      });
  
      pokemonsToDecrease.forEach(async (pokemon) => {
        pokemon.hp -= 10;
        console.log(pokemon.id);
        if(pokemon.hp<0)
          pokemon.deleteOne();
          else
          await pokemon.save();
      });
  
      console.log('Decreased health of eligible Pokemons.');
    } catch (error) {
      console.error('Error decreasing health:', error);
    }
  };
  
 
  