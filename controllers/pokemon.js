import ErrorHandler from "../middlewares/error.js";
import { Pokemon } from "../models/pokemon.js";

export const newPokemon = async (req, res, next) => {
  try {
    const { id, name, hp, moves, height, weight, attack, defense } = req.body;
    const userId = req.user._id;

    const existingPokemon = await Pokemon.findOne({ id, user: userId });
    if (existingPokemon) {
      return next(new ErrorHandler("Pokemon already adopted", 400));
    }
    // const userid = req.user._id;

    // const Pokemons = await Pokemon.find({ user: userid });

    // const adoptedPokemon = await Pokemon.findOne({id,user});
    // console.log(adoptedPokemon);
    //  if (adoptedPokemon) 
    //      return next(new ErrorHandler("Pokemon Already adopted", 400));
    // for (let i = 0; i < Pokemons.length; i++) {
    //   if (Pokemons[i].id === id) {
    //     return next(new ErrorHandler("Pokemon Already adopted", 400));
    //   }
    // }

    console.log('pass');
    await Pokemon.create({
        id,
        name,
        hp,
        moves,
        height,
        attack,
        weight,
        defense,
        user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Pokemon adopted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPokemon = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const Pokemons = await Pokemon.find({ user: userid });

    res.status(200).json({
      success: true,
      Pokemons,
    });
  } catch (error) {
    next(error);
  }
};

export const feedPokemon = async (req, res, next) => {
  const {hp}=req.body;
  try {
    const Pokemons = await Pokemon.findById(req.params.id);

    if (!Pokemons) 
    return next(new ErrorHandler("Pokemon not found", 404));
       Pokemons.hp=hp;
    await Pokemons.save();

    res.status(200).json({
      success: true,
      message: `Pokemon feeded by ${hp}!`,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePokemon = async (req, res, next) => {
  try {
    const Pokemons = await Pokemon.findById(req.params.id);

    if (!Pokemons) return next(new ErrorHandler("Pokemon not found", 404));
    await Pokemons.deleteOne();

    res.status(200).json({
      message: "Pokemon Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
