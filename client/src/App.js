import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from "./SearchResults";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {search: ''}
  }

  render() {
    return (
      <div>
        <div style={{position: 'fixed', top: 0, left: 0, right: 0}}>
          <input style={{
            textAlign:'center',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 40
          }} placeholder='Search' onChange={e => this.setState({search: e.target.value})} type='text'/>
        </div>
        <SearchResults search={this.state.search}/>
      </div>
    );
  }
}

export default App;
