import React, { Component } from 'react'
import quiz from '../Quiz.json';
import Answer from './Answer';
import { Dimmer, Header, Icon } from 'semantic-ui-react';
import Gauge from './Victory.js';

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      addClass: false,
      correct: true,
      score: 0,
      question: 0
    };
    this.handleClick = this.handleClick.bind(this);
    }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.', e.target.innerHTML);
    let answered = e.target.innerText.charAt(0);
    let currentQ = this.state.question;
    let answer = quiz[0].questions[currentQ].correctAnswer;
    let currentScore = this.state.score;
    answered === answer ? this.setState({ correct: true, score: currentScore + 1 }) : this.setState({ correct: false });
    console.log('The link was clicked.', answered);
    console.log(answer, quiz[0].questions[0]);
    // this.setState({ active: true });
    setTimeout(() => {
      this.handleOpen();
    }, 1000)
    setTimeout(() => {
      let nextQ = 0;
      let numberOfQuestions = Object.keys(quiz[0].questions).length; // Currently 5
      this.state.question === numberOfQuestions - 1 ? console.log('win condition?') : nextQ = this.state.question + 1;
      this.setState({ question: nextQ });
      this.state.question === 0 ? this.setState({ question: 1}) : console.log('Do nothing.');
    }, 1300)
    setTimeout(() => {
      // this.handleClose();
    }, 3000)
  }
  handleOpen = () => this.setState({ active: true })
  // handleClose = () => this.setState({ active: false })
  handleClose = () => {
    let numberOfQuestions = Object.keys(quiz[0].questions).length; // Currently 6
    if (this.state.question === numberOfQuestions - 1){
      console.log('Take win condition action on close'); // ? How keep score -> props down
      this.setState({ active: false })
    }
    this.setState({ active: false })
  }

  render() {
    let currentQuestion = this.state.question;
    const { active } = this.state
    let numberOfQuestions = Object.keys(quiz[0].questions).length;

    let dispy = 0;
    currentQuestion !== 0 ? dispy = currentQuestion - 1 : dispy = currentQuestion;
    let ques = quiz[0].questions[currentQuestion].question;
    let fullAnswer = quiz[0].questions[dispy].correctText;
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }
    function correct() { return 'That\'s right!' }
    function incorrect() { return 'NO!' }
    function winState(displayCorrect) {
      console.log(currentQuestion);
      if (currentQuestion === 5) {
        return sprea();
      }
      return displayCorrect;
    }
    function sprea() {
      return (
          <div>
            <p>IS THAT RIGHT!? Winner</p>
          </div>
      )
    }

    // if Q# === 5/6 -> html / Else

    return (
      <div>
        <Gauge questionper={(currentQuestion + 1)/numberOfQuestions} />
        { currentQuestion < 5 &&
        <div className="quiz-container">
          <h1>Quiz interface</h1>
            <div className="question box">
              <p><span>{currentQuestion + 1}/{numberOfQuestions}</span>{ques}</p>
            </div>
            <ul onClick={this.handleClick} className="answers">
              <Answer answerlet="a" questionnum={currentQuestion} />
              <Answer answerlet="b" questionnum={currentQuestion} />
              <Answer answerlet="c" questionnum={currentQuestion} />
            </ul>
          {/*<button className="box">Send<span>&rsaquo;</span></button>*/}
        </div>
        }
        { currentQuestion === 5 &&
          <div>
          <h2>End of Game -> Win condition found</h2>
          <p>{JSON.stringify(this.state)}</p>
          </div>
        }
          <Dimmer active={active} onClick={this.handleClose} page>
            <Header as='h2' icon inverted>
              <Icon name='hand pointer outline' />
              {winState(this.state.correct ? correct() : incorrect())}
              <Header.Subheader className="subtext">{fullAnswer}</Header.Subheader>
            </Header>
          </Dimmer>

      </div>
    )
  }
}
