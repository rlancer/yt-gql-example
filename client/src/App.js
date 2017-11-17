import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {search: ''}
  }

  render() {
    return (
      <div>
        <h1>{this.state.search}</h1>
        <input placeholder='Search' onChange={e => this.setState({search: e.target.value})} type='text'/>
        <SearchResults/>
      </div>
    );
  }
}

export default App;
