import React, { Component } from 'react';
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            modalStyle: {
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                },
                content: {
                    height: '250px',
                    width: '400px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }
            },
            searched: false,
            ////validation
            limit: 0,
            artistName: "",
            formInvalid: true,
            limitInvalid: true,
            artistNameInvalid: true
            //////////////
        };
    }
    openModal = () => {
        this.setState({ modalOpened: true });
    }
    searchTracks = () => {
        this.setState({ searched: true })
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => this.validateForm(name, value));
    }
    validateForm = (name, value) => {
        if (name == 'artistName') {
            if (value !== '' && value.length > 2) {
                if (!this.state.limitInvalid) {
                    this.setState({ artistNameInvalid: false, formInvalid: false });
                }else{
                    this.setState({ artistNameInvalid: false});
                }
            }
            else{
                this.setState({ artistNameInvalid: true, formInvalid:true });
            }
        } else if (name == 'limit') {
            if (!isNaN(value) && value > 0) {
                if (!this.state.artistNameInvalid) {
                    this.setState({ limitInvalid: false, formInvalid: false });
                }else{
                    this.setState({ limitInvalid: false});
                }
            }else{
                this.setState({ limitInvalid: true, formInvalid: true });
            }
            
        }
    }
    render() {
        if (this.state.searched) {
            const url = `./search/${this.state.artistName}/${this.state.limit}`
            return (<Redirect to={url} />)
        }
        return (
            <div>
                <p>Find your artist below</p>
                <button onClick={this.openModal}>Search artist</button>

                <Modal
                    isOpen={this.state.modalOpened}
                    style={this.state.modalStyle}
                    contentLabel="Modal">
                    <h1>Enter Search Criteria</h1>
                    <label htmlFor='artistName'>Artist Name</label>
                    <input type='text' id='artistName' name='artistName' value={this.state.artistName} onChange={this.handleUserInput} />
                    <label htmlFor='limit'>Number of Tracks</label>
                    <input type='number' id='limit' name='limit' value={this.state.limit} onChange={this.handleUserInput} />
                    <button onClick={this.searchTracks} disabled={this.state.formInvalid}>Search</button>
                </Modal>
            </div>
        );
    }
}

export default SearchComponent;
