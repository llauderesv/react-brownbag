import React from 'react';
import Person from './components/Person';
import Sites from './components/Sites';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Person name={'Vince'} age={20} />
        <Sites />
      </React.Fragment>
    );
  }
}

export default App;
