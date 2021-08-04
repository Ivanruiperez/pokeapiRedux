import actionTypes from '../actions/actionTypes';

export default function pokeReducer(state = {}, action) {
  let updatedState;
  switch (action.type) {
    case actionTypes.LOAD_POKEMON_DETAIL:
      updatedState = { ...state, pokemonDetail: action.pokemonDetail };
      break;
    case actionTypes.LOAD_ERROR:
    default:
      updatedState = state;
      break;
  }

  return updatedState;
}