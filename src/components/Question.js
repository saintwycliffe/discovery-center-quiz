import React, { Component } from 'react'
import quiz from '../Quiz.json';
import { Dimmer, Header, Icon, Transition } from 'semantic-ui-react'

const ques = quiz[0].questions[0].question;
const a1 = quiz[0].questions[0].answers[0];
const a2 = quiz[0].questions[0].answers[1];
const a3 = quiz[0].questions[0].answers[2];


export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = { active: false, addClass: false, animation: 'flash', duration: 600, visible: true };
    this.handleClick = this.handleClick.bind(this);
    }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  toggleVisibility = () => {
    this.toggle(); 
    this.setState({ visible: !this.state.visible })
    setTimeout(() => {
      this.handleOpen();
    }, 1000)
    setTimeout(() => {
      this.handleClose();
    }, 5000)
  }
  toggle() {
      this.setState({addClass: !this.state.addClass});
    }
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
  handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.', e.target.innerHTML);
      // this.setState({ active: true });
      this.handleOpen()
      // Set timer to direct user to next question
      // setTimeout(function(){ alert("Hello"); }, 3000);
    }

  render() {

    const { active } = this.state
    const { animation, duration, visible } = this.state
    let boxyClass = ["boxy"];
    if(this.state.addClass) {
        boxyClass.push('green');
      }

    return (
      <div>

        <div className="quiz-container">
          <h1>Quiz interface</h1>
            <div className="question box">
              <p><span>1.</span>{ques}</p>
            </div>
            <ul className="answers">
              <li onClick={this.handleClick} className="answer box">
                <p><span>a</span>{a1}</p>
              </li>
              <Transition animation={animation} duration={duration} visible={visible}>
                <li onClick={this.toggleVisibility} className="answer box">
                  <p className={boxyClass.join(' ')} onClick={this.toggle.bind(this)}><span>b</span>{a2}</p>
                </li>
              </Transition>
              <li className="answer box">
                <p><span>c</span>{a3}</p>
              </li>
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
