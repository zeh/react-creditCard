import './style.css';

import React from 'react';
import {render} from 'react-dom';

import CreditCard from '../../src';

const App = React.createClass({
  getInitialState() {
    return {
      card: ''
    }
  },

  onChange(value) {
    this.setState({card: value});
  },

  render() {
    return <div className="App">
      <h1>
        <code>&lt;<a href="https://github.com/insin/react-maskedinput">Credit Card</a>/&gt;</code>
      </h1>
      <p className="lead">A React component which creates a masked <code>&lt;input/&gt;</code></p>
      <form>
        <input id="ccnumber" name="ccnumber" autoComplete="cc-number" size="20"/>
      </form>
      <div className="form-field">
        <label htmlFor="ccnumber">Card Number:</label>
        <CreditCard id="ccnumber" name="ccnumber" autoComplete="cc-number" size="20" onChange={this.onChange}/>
      </div>

      <div>
        Selected Value: {this.state.card}
      </div>

      <footer><a href="https://github.com/insin/react-maskedinput">Source on GitHub</a></footer>
    </div>
  }
});

render(<App/>, document.getElementById('demo'));
