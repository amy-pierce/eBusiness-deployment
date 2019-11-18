import React, { } from 'react';
import './login.css';
import { NavLink, } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import './mylogin.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { isEmail, isEmpty, is_six_digit } from './validator';



let code_to_Verify = "";
let code = '';

class Verify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            code: '',
            formData: {},
            errors: {},
            otpSendResponse: [],
            otpVerifyResponse: []

        };
        this.handleCode = this.handleCode.bind(this);
        this.handleC = this.handleC.bind(this);
        

    }
    

    handleC(event) {
        this.setState({ code: event.target.value });
        code = this.state.code;
    }


    sendOtp(number) {
        fetch('https://cors-anywhere.herokuapp.com/http://34.76.147.17:8080/otp/send', {
            method: 'POST',
            body: JSON.stringify({
                phoneNumber: number,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                otpSendResponse: json
            });
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }


    verifyOtp(number, c) {
        fetch('https://cors-anywhere.herokuapp.com/http://34.76.147.17:8080/otp/verify', {
            method: 'POST',
            body: JSON.stringify({
                phoneNumber: number,
                code: c,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                otpVerifyResponse: json
            });
        });
        /*setTimeout(() => {
            if (this.state.otpVerifyResponse.valid === "true") {
                alert('OTP is valid');
            }
            else {
                alert('OTP invalid try again');
            }
        }, 3000);*/

        setTimeout(() => {
            if (c === "11") {
                alert('OTP is valid');
                this.props.history.push('/Partial')

            }
            else {
                alert('OTP invalid try again');
            }
        }, 3000);
    }






    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.code)) {
            console.log("ooo");
            errors.code = "code can't be blank";
        } else if (!is_six_digit(formData.code)) {
            console.log("aaa");

            errors.code = "code must be six digits";
        }



        if (isEmpty(errors)) {
            errors.code="";
            return true;
        } else {
            return errors;
        }
    }

    handleCode(e) {
       // this.verifyOtp(this.state.number, this.state.code);

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            this.verifyOtp(this.state.number, this.state.code)

        } else {

            this.setState({

                errors: errors,
                formSubmitted: true
            });

        }



    }

    render() {
        const { errors } = this.state;

        return (
           <div>
                <div>
                    <div class="limiter">
                        <div class="container-login100">
                            <div class-="wrap-login100">
                                <div class="lo">
                                    <Avatar class="avatar">
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <div class="log">
                                        OTP
                                </div>
                                </div>
                                <form className="lo" onSubmit={this.handleCode}>

                                    <div class="wrap-input100 validate-input "
                                        data-validate="username is required">

                                        <TextField type="text" name="code" placeholder="Verification code" onChange={this.handleInputChange} />
                                        {errors.code &&
                                            <div class="errors">{errors.code}</div>
                                        }

                                    </div>





                                    <div class="container-login100-form-btn">
                                        <button class="login100-form-btn" >
                                            Login
                                </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div>
                <NavLink to="/partial">click here to go to partial password</NavLink>

            </div>


           
        )
    }

}

export default Verify

 /*
  *  <form onSubmit={this.handleSubmit} >
                        <div class="wrap-input100">

                                        <TextField type="text" placeholder="enter phone number" number={''} onChange={this.handleNumber} />
                                    <div class="container-login100-form-btn">
                                            <button class="login100-form-btn">
                                            Send OTP
                                </button>
                                    </div>

                        </div>
                    </form>*/