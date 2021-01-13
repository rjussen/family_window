import Connect from "./Connect";
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ConnectClass.css';
class ConnectClass extends Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          code: '12345',
          paired: false
        };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        this.state.value == this.state.code ? this.state.paired = true : this.state.paired = false;

        setTimeout(() => {
            this.state.value == this.state.code ? alert('Paired succesfully with code: ' + this.state.value) : alert("Pairing unsuccessful");
            this.setState({value: ''});
        }, 1000);
        
    }
  
    render() {
      return (
        <div className="pairing">
            <form className="form" onSubmit={this.handleSubmit}>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    type="text" value={this.state.value} onChange={this.handleChange}
                />
                <Button  variant="contained" color="primary" type="submit" value="Submit">
                    Submit
                </Button>
            </form>
            {this.state.paired ? <h1 className="paired"> Paired!</h1> : null}
        </div>
      );
    }
  }

  export default ConnectClass;