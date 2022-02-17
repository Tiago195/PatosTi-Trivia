import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Headers';
import { fetchGeneric } from '../../helpers';
import Questions from '../../components/Questions';
import { setToken } from '../../action';

class index extends Component {
  constructor(props) {
    super(props);

    this.requestApi = this.requestApi.bind(this);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.requestApi();
  }

  async requestApi() {
    const { url } = this.props;
    const {results} = await fetchGeneric(url);
    this.setState({ questions: results });
  }

  render() {
    const { questions } = this.state;
    const { indexQuestion, history } = this.props;

    return (
      <div>
        <Header />
        {questions.length && (
          <Questions
            category={ questions[indexQuestion].category }
            question={ questions[indexQuestion].question }
            answer={ [...questions[indexQuestion].incorrect_answers,
              questions[indexQuestion].correct_answer] }
            difficulty={ questions[indexQuestion].difficulty }
            history={ history }
          />
        )}
      </div>
    );
  }
}

index.propTypes = {
  sendToToken: PropTypes.func,
  token: PropTypes.string,

}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendToToken: (token) => dispatch(setToken(token)),
});

const mapStateToProps = ({ token, player, url }) => ({
  token,
  indexQuestion: player.indexQuestion,
  url,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
