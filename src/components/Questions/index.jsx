import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScore, nextQuestion, setAssertions } from '../../action';

class index extends Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      showAnswer: false,
      timeOff: false,
      timer: 30,
      newArray: [],
      showNext: false,
    };

    this.questionTimeOut = this.questionTimeOut.bind(this);
    this.showTimer = this.showTimer.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.settingStateTimer = this.settingStateTimer.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  componentDidMount() {
    this.questionTimeOut();
    this.showTimer();
    this.handleQuestions();
  }

  componentDidUpdate({ question: prevQuestion }) {
    const { question } = this.props;
    if (question !== prevQuestion) {
      this.settingStateTimer();
      this.questionTimeOut();
      this.showTimer();
      this.handleQuestions();
    }
  }

  settingStateTimer() {
    clearInterval(this.timeOffId);
    this.setState({ timeOff: false, timer: 30, showAnswer: false, showNext: false });
  }

  btnResult = (btn) => {
    const result = /correct/i.test(btn);
    if (result) {
      return 'correctAnswer';
    }
    return 'wrongAnswer';
  }

  answerResult = (param) => {
    const TEN = 10;
    this.setState({ showAnswer: true, showNext: true });
    if (param === 'correct-answer') {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
      const { sumScore, difficulty } = this.props;
      const { timer } = this.state;
      const point = {
        hard: 3,
        medium: 2,
        easy: 1,
      };
      sumScore(TEN + (timer * point[difficulty]));
    }
  }

  showTimer() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => this.setState(({ timer }) => ({
      timer: timer - 1,
    }), () => {
      const { timer } = this.state;
      if (timer === 0) {
        this.setState({ showNext: true });
        clearInterval(this.intervalId);
      }
    }), ONE_SECOND);
  }

  questionTimeOut() {
    const TIME_OUT = 30000;
    this.timeOffId = setTimeout(() => this.setState({ timeOff: true }), TIME_OUT);
  }

  handleQuestions() {
    const MAGIC_NUMBER = 0.5;
    const { answer } = this.props;
    const newArray = answer.reduce((a, b, i) => {
      a.push({
        quest: b,
        id: b === answer[answer.length - 1] ? 'correct-answer' : `wrong-answer-${i}`,
      });
      return a;
    }, []);

    this.setState({ newArray: newArray.sort(() => Math.random() - MAGIC_NUMBER) });
  }

  nextButton() {
    const LAST_QUESTION = 4;
    const {
      nextQuestion: nextQuest,
      indexQuestion,
      history,
      sendAssertions } = this.props;
    const { assertions } = this.state;
    clearInterval(this.intervalId);
    if (indexQuestion === LAST_QUESTION) {
      sendAssertions(assertions);
      history.push('/feedback');
    }
    nextQuest();
  }

  render() {
    const { category, question,
    } = this.props;
    const { timeOff, timer, newArray, showAnswer, showNext } = this.state;
    return (
      <div data-testid="answer-options">
        <h3>
          {timer}
        </h3>
        <h4 data-testid="question-category">{category}</h4>
        <h3 data-testid="question-text">{question}</h3>
        {newArray.map((quest) => (
          <button
            key={ quest.id }
            type="button"
            data-testid={ quest.id }
            disabled={ timeOff }
            className={ showAnswer ? this.btnResult(quest.id) : null }
            onClick={ () => this.answerResult(quest.id) }
          >
            {quest.quest}
          </button>

        ))}
        {showNext && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextButton }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

index.propTypes = {
  category: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.arrayOf(PropTypes.string),
  sumScore: PropTypes.func,
  nextQuestion: PropTypes.func,
  sendAssertions: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sumScore: (result) => dispatch(setScore(result)),
  nextQuestion: () => dispatch(nextQuestion()),
  sendAssertions: (value) => dispatch(setAssertions(value)),
});

const mapStateToProps = ({ player }) => ({
  indexQuestion: player.indexQuestion,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
