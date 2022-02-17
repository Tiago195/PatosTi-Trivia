import React, { Component } from 'react';
import PropTypes from 'prop-types';
import supabase from '../../api/createBase';
import {FaUserNinja} from 'react-icons/fa';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  async getLocalStorage() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ players });
    const { data } = await supabase.from('rankingTrivia')
      .select('*');
    this.setState({ data: data.sort((a,b) => b.score-a.score) });
  }

  render() {
    const { history } = this.props;
    const { players, data } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <section>
          {data && data.map((player, i) => (
            <section key={ player.id } style={ {display: 'flex'}}>
              {player.picture.includes('@') 
              ? <FaUserNinja style={ {fontSize: '50px'} }/>
              : <img src={ player.picture } alt="Foto do jogador" width="50px" />
              }
              <h3 data-testid={ `player-name-${i}` }>{player.name}</h3>
              <h2 data-testid={ `player-score-${i}` }>{player.score}</h2>
            </section>
          ))}
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Inicio
        </button>
      </div>
    );
  }
}

index.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default index;
