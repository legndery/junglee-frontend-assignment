import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import './TrackList.css'

class TrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.state.params = this.validateParams();
    }
    validateParams = () => {
        const p = this.props.match.params;
        if (isNaN(p.limit)) {
            p.limit = 5;
        }
        if(p.term == ''){
            p.term ='Jack'
        }
        return p;
    }
    componentWillMount = () => {
        const url = 'https://itunes.apple.com/search';
        axios.get(url, {
            params: this.state.params
        })
        .then((response) =>{
            const {resultCount, results} = response.data;
            this.setState({'searchResults':results});
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        if(!this.state.searchResults){
            return (<div className='track-list container'>Loading</div>);
        }
        const trackListItems = this.state.searchResults.map(function(elem, i){
            return (
                <div className='track-list-item clearfix'>
                <div className='left clearfix'>
                <img src={elem.artworkUrl100} className='item-img' />
                </div>
                <div className='right'>
                <p>Artist Name: {elem.artistName}</p>
                <p>Track Name: {elem.trackName}</p>
                <p>Album Name: {elem.collectionName}</p>
                <hr />
                </div>
                </div>
            )
        });
        return (
            <div className='track-list container'>
                <p className='title'>Search results for "{this.state.params.term}". <Link to="/">(clear)</Link></p>
                {trackListItems}
            </div>
        );
    }
}
export default TrackList;