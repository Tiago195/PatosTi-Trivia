import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../../helpers';
import { setToken, setInfoUser, resetGame } from '../../action';
import 'react-toastify/dist/ReactToastify.css'

class index extends Component {
  constructor() {
    super();
    this.state = {
      btnIsOn: true,
      email: '',
      player: '',
    };
  }

  validation = () => {
    const { email, player } = this.state;
    const NUMBER = 1;
    this.setState({ btnIsOn: !(email.length >= NUMBER && player.length >= NUMBER) });
  }
  
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validation);
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('./settings');
  }

  async btnSubmit() {
    const { sendToGlobal, sendToToken, history, resetIndex } = this.props;
    const { player, email } = this.state;
    const token = await getToken();
    localStorage.setItem('token', token);
    resetIndex();
    sendToToken(token);
    sendToGlobal({ player, email });
    history.push('/game');
  }

  render() {
    const { btnIsOn } = this.state;
    return (
      <div>
        <label htmlFor="email">
          nick do Github:
          <input
            id="email"
            type="text"
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="player">
          Nome do Jogador:
          <input
            id="player"
            type="text"
            name="player"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnIsOn }
          onClick={ () => this.btnSubmit() }
        >
          Play

        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

index.propTypes = {
  sendToGlobal: PropTypes.func,
  resetIndex: PropTypes.func,
  sendToToken: PropTypes.func,
}.isRequired;

// requisito 01
const mapDispatchToProps = (dispatch) => ({
  sendToToken: (obj) => dispatch(setToken(obj)),
  resetIndex: () => dispatch(resetGame()),
  sendToGlobal: (obj) => dispatch(setInfoUser(obj)),
});

export default connect(null, mapDispatchToProps)(index);
