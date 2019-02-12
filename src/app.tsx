import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';

//import List from './src/List'
class App extends React.Component<{}, { counter: number }> {

  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.clicker = this.clicker.bind(this);
  }

  componentDidMount() {
    this.state = { counter: 0 };
  }

  clicker() {
    console.log(this.state);

    this.setState(state => ({
      counter: state.counter + 1
    }));
  }

  render() {
    let count = this.state.counter;
    return (
      <button onClick={this.clicker}>
      Hello {count}
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
