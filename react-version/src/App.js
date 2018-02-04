import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import SearchComponent from './search-component/SearchComponent'
import TrackList from './list-component/TrackList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpened: false };
  }
  openModal= ()=>{
    this.setState({modalOpened:true});
  }
  render() {

    return (
      <Router>
        <div>
        <Route exact path='/' component={SearchComponent}/>
        <Route path='/search/:term/:limit' component= {TrackList}/>
        </div>
      </Router>
    );
  }
}

export default App;
