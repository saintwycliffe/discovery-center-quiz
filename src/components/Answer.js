import React, { Component } from 'react'
import quiz from '../Quiz.json';
import { Transition } from 'semantic-ui-react'

export default class Answer extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      addClass: false,
      animation: 'flash',
      duration: 600,
      visible: true,
      correct: true,
      correctText: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  toggleVisibility = (e) => {
    this.toggle();
    // let answered = e.target.innerText.charAt(0);
    // let answer = quiz[0].questions[0].correctAnswer;
    // console.log('The link was clicked.', answered);
    // console.log(answer, quiz[0].questions[0]);
    this.setState({ visible: !this.state.visible })
  }
  toggle() {
      this.setState({addClass: !this.state.addClass});
    }

  render() {
    // ANIMATION
    const { active } = this.state
    const { animation, duration, visible } = this.state
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }
    let xtraNames = ' answer box';
    // PROPS
    let questionnum = this.props.questionnum;
    let answerlet = this.props.answerlet;
      function letterToNum() {
        if (answerlet === 'a') {
          return 0;
        } else if (answerlet === 'b') {
          return 1;
        } else {
          return 2;
        }
      }
    // console.log(letterToNum(), 'sons of guns');
    console.log('Passing PROPS!', this.props);
    let option = quiz[0].questions[questionnum].answers[letterToNum()];

    return (
          <Transition animation={animation} duration={duration} visible={visible}>
            <li onClick={this.toggleVisibility} className={boxyClass.join(' ') + xtraNames} >
              <p onClick={this.toggle.bind(this)}><span>{this.props.answerlet}</span>{option}</p>
            </li>
          </Transition>
    )
  }
}
