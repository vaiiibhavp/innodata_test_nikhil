
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Register extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            user_id : '',
            email : '',
            phone : '',
            tech_id : '',
            password : '',
            techs: [],
            is_phone : true,
            is_email : true,
        };
        this.getTechnologies()
        this.handleChange = this.handleChange.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getTechnologies() {
        await axios.get('http://localhost:8000/technology').then((data) => {
           
            this.setState({
                techs: data.data.techs
            });
        })
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post('http://localhost:8000/register', {
                name: this.state.name,
                user_id : this.state.user_id,
                email : this.state.email,
                phone : this.state.phone,
                tech_id : this.state.tech_id,
                password : this.state.password,
            })
            .then(response => {

                if(response.status == 201)
                {
                    alert('Record Added Successfully');

                    this.setState({
                        is_phone: true,
                        is_email : true,
                        name: '',
                        user_id : '',
                        email : '',
                        phone : '',
                        tech_id : '',
                        password : '',
            
                    });
                }
                else
                {
                    alert(response.data.message);
                }
               
            },error => {
                console.log(error)
                alert(error.response.data.message);
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    handleUser(e){
        const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        // Trim value & convert to lowercase
        const value = e.target.value.trim().toLowerCase();
        this.setState({
            is_phone: true,
            is_email : true,
            email : '',
            phone : ''

        });
        if(email.test(value))
        {
            this.setState({
                email: value,
                is_email : false
            }); 

        }
        else if(phone.test(value))
        {
            this.setState({
                phone: value,
                is_phone : false
            }); 
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">
                                <form method="POST" onSubmit={this.handleSubmit} autoComplete='off'>
                                    

                                    <div className="row mb-3">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.name} required/>

                                            {/* @error('name')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="user_id" className="col-md-4 col-form-label text-md-end">User Id</label>

                                        <div className="col-md-6">
                                            <input id="user_id" type="text" className="form-control" name="user_id" value={this.state.user_id} onChange={this.handleChange} onBlur={this.handleUser} required />

                                            {/* @error('name')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>
                                    {this.state.is_email ? 
                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email" onChange={this.handleChange} value={this.state.email} required />

                                            {/* @error('email')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>
                                    : ''}
                                    {this.state.is_phone ? 
                                    <div className="row mb-3">
                                        <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">Phone</label>

                                        <div className="col-md-6">
                                            <input id="phone" type="text" className="form-control" name="phone" onChange={this.handleChange} value={this.state.phone} required />

                                            {/* @error('name')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>
                                    : ''}
                                    <div className="row mb-3">
                                        <label htmlFor="technology" className="col-md-4 col-form-label text-md-end">Technology</label>

                                        <div className="col-md-6">
                                            <select id="technology" type="text" className="form-control" name="tech_id" onChange={this.handleChange} value={this.state.tech_id}>
                                                <option value="">Select Technology</option>
                                                {
                                                    this.state.techs.map(val => (
                                                        <option value={val.id}>{val.name}</option>
                                                    ))
                                                       
                                                }
                                                
                                            </select>

                                            {/* @error('name')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password} required/>

                                            {/* @error('password')
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror */}
                                        </div>
                                    </div>

                                    <div className="row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;