import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
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
        const url = 'http://itunes.apple.com/search';
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
            return (<div>Loading</div>);
        }
        const trackListItems = this.state.searchResults.map(function(elem, i){
            return (
                <div style={ {border:'1px solid black'}}><p>{elem.artistName}</p>
                <p>{elem.trackName}</p></div>
            )
        });
        return (
            <div>
                <h1>List Page <Link to="/">(clear)</Link></h1>
                {trackListItems}
            </div>
        );
    }
}
export default TrackList;