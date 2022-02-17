import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class index extends Component {
  render() {
    const { player } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
          alt="avata do usuario"
        />
        <h2 data-testid="header-player-name">{player.name}</h2>
        <h4 data-testid="header-score">{player.score}</h4>
      </header>
    );
  }
}

index.propTypes = {
  player: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(index);
