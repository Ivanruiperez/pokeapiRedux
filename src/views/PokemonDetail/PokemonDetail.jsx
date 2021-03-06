import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  loadPokemonMove,
  loadPokemonAbility,
  requestPokemonMoves,
  requestPokemonList,
  requestPokemonAbilities,

} from '../../redux/actions/appActions';
import Loading from '../../components/Loading/Loading';
import PokemonAbilities from '../../components/PokemonAbilities/PokemonAbilities';
import BaseStats from '../../components/BaseStats/BaseStats';
import PokeTypes from '../../components/PokeTypes/PokeTypes';
import PokeMoves from '../../components/PokeMoves/PokeMoves';
import { firstPokemonIndex, lastPokemonIndex } from '../../assets/constants/index';
import './PokemonDetail.scss';

function PokemonDetail({ pokemonDetail, pokemonMoves, pokemonAbility }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pokeDetailArr, setPokeDetailArr] = useState(null);
  const [pokeDetail, setPokeDetail] = useState(null);
  const [pokeSprite, setPokeSprite] = useState(null);
  const [pokeStats, setPokeStats] = useState(null);

  useEffect(() => {
    if (pokemonDetail) {
      setPokeDetailArr(pokemonDetail?.filter((pokeName) => pokeName.name === id));
    }
  }, [pokemonDetail]);
  useEffect(() => {
    if (pokeDetailArr) {
      setPokeDetail(pokeDetailArr[0]);
    }
  }, [pokeDetailArr]);
  useEffect(() => {
    if (pokeDetail) {
      dispatch(requestPokemonMoves(pokeDetail.moves));
      dispatch(requestPokemonAbilities(pokeDetail.abilities));
      setPokeSprite(pokeDetail.sprites.other['official-artwork'].front_default);
      setPokeStats(pokeDetail.stats);
    }
  }, [pokeDetail]);
  useEffect(() => {
    if (!pokemonMoves) {
      dispatch(loadPokemonMove);
    }
  }, [pokeDetail]);
  useEffect(() => {
    if (!pokemonAbility) {
      dispatch(loadPokemonAbility);
    }
  }, [pokeDetail]);
  useEffect(() => {
    if (!pokemonDetail) {
      dispatch(requestPokemonList(lastPokemonIndex, firstPokemonIndex));
    }
  }, []);
  return (

    pokeDetail
      ? (
        <main className="poke-detail-section">
          <h1>{pokeDetail.name}</h1>
          <section className="poke-details">
            <section className="poke-details_box">
              <div className="sprite">
                <img
                  src={pokeSprite}
                  alt="pokeDetail"
                />
              </div>
              <div className="poke-types-box">
                {pokeDetail.types.map((type) => (
                  <PokeTypes type={type} key={type.type.name} />
                ))}
              </div>
            </section>
            <section className="poke-details_box">
              <BaseStats pokeStats={pokeStats} key="pokeStats" />
              <div className="poke-ability-box">
                {pokemonAbility && (
                  pokemonAbility.map((ability) => (
                    <PokemonAbilities ability={ability} key={ability.name} />
                  ))
                )}
              </div>
            </section>

          </section>
          <section className="poke-moves-box">
            <h2>Moves can learn</h2>
            <ul className="poke-move-list">
              {pokemonMoves && (pokemonMoves.map((move) => (
                <PokeMoves move={move} key={move.name} />
              ))
              )}
            </ul>
          </section>
        </main>
      )
      : <Loading />
  );
}

function mapStateToProps({ pokeReducer }) {
  return {
    pokemonDetail: pokeReducer.pokemonDetail,
    pokemonMoves: pokeReducer.pokemonMove,
    pokemonAbility: pokeReducer.pokemonAbility,
  };
}

export default connect(mapStateToProps)(PokemonDetail);
