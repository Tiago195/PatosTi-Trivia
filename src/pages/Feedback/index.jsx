import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../../components/Headers';
import { idGenerator } from '../../helpers';
import supabase from '../../api/createBase';

const THREE = 3;

class Index extends Component {
  onSaveLocalStorage = async () => {
    const { history, global: { player: { name, score, gravatarEmail } } } = this.props;
    const getPlayers = JSON.parse(localStorage.getItem('ranking')) || [];
    const infoPlayer = {
      name,
      score,
      picture: `https://github.com/${gravatarEmail}.png`,
      id: idGenerator(),
    };
    const players = [...getPlayers, infoPlayer].sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(players));
    const {data} = await supabase.from('rankingTrivia').select('*');
    const user = data.find(e => e.picture === infoPlayer.picture);
    if(user) {
      console.log('entre')
      await supabase.from('rankingTrivia').update({[data.findIndex(e => e.picture === infoPlayer.picture)]: infoPlayer})
    } else {
      await supabase.from('rankingTrivia')
      .insert(infoPlayer);
    }
    history.push('/ranking');
  }

  render() {
    const { global: { player }, history } = this.props;
    // console.log(player);
    return (
      <div data-testid="feedback-text">
        <Header />
        {(player.assertions < THREE)
          ? <h1 data-testid="feedback-text">Could be better...</h1>
          : <h1 data-testid="feedback-text">Well Done!</h1>}
        <h2 data-testid="feedback-total-score">
          { player.score }
        </h2>
        <h2 data-testid="feedback-total-question">
          { player.assertions }
        </h2>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.onSaveLocalStorage }
        >
          Ver Ranking
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  global: state,
});

Index.propTypes = {
  global: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Index);
