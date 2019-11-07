import React, { createRef } from 'react';
import Details from '../Details';

import './index.css';

class Person extends React.Component {
  constructor(props) {
    super(props);

    this.firstName = createRef(null);

    this.state = {
      name: this.props.name,
      firstName: '',
    };

    this.checkAge = this.checkAge.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

    console.log('Constructor');
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  componentWillMount() {
    // window.removeEventListener('click', () => {
    //   console.log('Hey');
    // });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    // window.addEventListener('click', () => {
    //   console.log('Hey');
    // });
    console.log('componentDidMount');
  }

  checkAge() {
    const { age } = this.props;
    if (age < 21) {
      return 'Too young';
    }
    return 'Too old';
  }

  displayMessage() {
    this.setState({ name: 'Giann' });
    alert("Hello I'm " + this.state.name);
  }

  handleOnChange(event) {
    this.setState({ firstName: event.target.value });
    // this.firstName.current = event.target.value;
    // console.log(this.firstName.current.value);
  }

  render() {
    console.log('render');

    const { age } = this.props;

    return (
      <div className="person">
        <Details
          name={this.state.name}
          age={age}
          displayMessage={this.displayMessage}
        />

        <h1>First Name: {this.state.firstName}</h1>
        <input
          ref={this.firstName.current}
          name="first name"
          onChange={this.handleOnChange}
        />
        <p style={{ color: 'red' }}>
          {!this.state.firstName && 'First name is required.'}
        </p>
      </div>
    );
  }
}

export default Person;
