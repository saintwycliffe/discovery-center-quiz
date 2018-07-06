import React, { Component } from 'react'
import quiz from '../Quiz.json';
import Answer from './Answer';
import { Dimmer, Header, Icon } from 'semantic-ui-react'

const ques = quiz[0].questions[0].question;

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      addClass: false,
      correct: true,
      correctText: 'asdf',
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
    let answer = quiz[0].questions[0].correctAnswer;
    console.log('The link was clicked.', answered);
    console.log(answer, quiz[0].questions[0]);
    // this.setState({ active: true });
    // Set timer to direct user to next question
    // setTimeout(function(){ alert("Hello"); }, 3000);
    setTimeout(() => {
      this.handleOpen();
    }, 1000)
    // setTimeout(() => {
    //   this.handleClose();
    // }, 5000)
    // Set timer to direct user to next question
    // setTimeout(function(){ alert("Hello"); }, 3000);
  }
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render() {

    const { active } = this.state
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }
    console.log(this.state.question);
    let ohyeah = this.state.question;

    return (
      <div>

        <div className="quiz-container">
          <h1>Quiz interface</h1>
            <div className="question box">
              <p><span>1.</span>{ques}</p>
            </div>
            <ul onClick={this.handleClick} className="answers">
              <Answer answerlet="a" questionnum={ohyeah} />
              <Answer answerlet="b" questionnum={ohyeah} />
              <Answer answerlet="c" questionnum={ohyeah} />
            </ul>
          {/*<button className="box">Send<span>&rsaquo;</span></button>*/}
        </div>

          <Dimmer active={active} onClick={this.handleClose} page>
            <Header as='h2' icon inverted>
              <Icon name='hand pointer outline' />
              Good Guess!
              <Header.Subheader>But no lucks</Header.Subheader>
            </Header>
          </Dimmer>

      </div>
    )
  }
}
