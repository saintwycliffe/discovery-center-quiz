import React, { Component } from 'react'
import quiz from '../Quiz.json';
import Answer from './Answer';
import { Dimmer, Header, Icon } from 'semantic-ui-react'


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
    let answer = quiz[0].questions[0].correctAnswer;
    console.log('The link was clicked.', answered);
    console.log(answer, quiz[0].questions[0]);
    // this.setState({ active: true });
    setTimeout(() => {
      this.handleOpen();
    }, 1000)
    setTimeout(() => {
      let nextQ = 0;
      this.state.question === 3 ? this.setState({ question: 0 }) : nextQ = this.state.question + 1;
      this.setState({ question: nextQ });
    }, 1300)
    setTimeout(() => {
      this.handleClose();
    }, 3000)
  }
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render() {

    const { active } = this.state
    let currentQuestion = this.state.question;
    let ques = quiz[0].questions[currentQuestion].question;
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }
    console.log(this.state.question);
    function correct() { return 'That\'s right!' }
    function incorrect() { return 'NO!' }
    // function incorrect() {
    //   return (
    //     <div>
    //       <p>IS THAT RIGHT!?</p>
    //     </div>
    //   )
    // }

    return (
      <div>

        <div className="quiz-container">
          <h1>Quiz interface</h1>
            <div className="question box">
              <p><span>1.</span>{ques}</p>
            </div>
            <ul onClick={this.handleClick} className="answers">
              <Answer answerlet="a" questionnum={currentQuestion} />
              <Answer answerlet="b" questionnum={currentQuestion} />
              <Answer answerlet="c" questionnum={currentQuestion} />
            </ul>
          {/*<button className="box">Send<span>&rsaquo;</span></button>*/}
        </div>

          <Dimmer active={active} onClick={this.handleClose} page>
            <Header as='h2' icon inverted>
              <Icon name='hand pointer outline' />
              {incorrect()}
              {/*<Header.Subheader>But no lucks</Header.Subheader>*/}
            </Header>
          </Dimmer>

      </div>
    )
  }
}
