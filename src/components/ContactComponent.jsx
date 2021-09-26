import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button,  Label,Col, Row }from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, Form, Errors} from 'react-redux-form'


const required =(val)=>val && val.length 
const maxLength =(len)=> (val) =>!(val) || (val.length<= len)
const minLength =(len)=> (val) =>val && (val.length>= len)
const isNumber =(val)=>!isNaN(Number(val))
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends Component {
    constructor(props){
        super(props)
        
        this.handelSumit= this.handelSumit.bind(this);
    }
    
    handelSumit(values){
        console.log("current state is: "+ JSON.stringify(values))
        alert("current state is: "+ JSON.stringify(values))
        this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email,
             values.agree, values.contactType, values.message)
        this.props.resetFeedbackForm();

    }
    

    render(){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/home'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className='row row-content'>
                <div className='col-12 '>
                    <h3>Send us your feedback</h3>
                </div>
                <div className='col-12 col-md-9'>
                    <Form  model='feedback' onSubmit={(values)=>this.handelSumit(values)}>
                        <Row className="form-group">
                            <Label for='firstName' md={2}>First Name </Label>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstName" name="firstName" 
                                placeholder="First Name" 
                                className="form-control"
                                validators={{
                                    required,
                                    minLength:minLength(3),
                                    maxLength:maxLength(15)
                                }}/>
                                <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                    required:'required',
                                    minLength:"must be more 3 charcter",
                                    maxLength:"must be less then 15 "
                                }}></Errors>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for='lastName' md={2}>last Name </Label>
                            <Col md={10}>
                                <Control.text model=".lastname" id="lastName" name="lastName"
                                 placeholder="last Name" 
                                 className="form-control"validators={{
                                    required,
                                    minLength:minLength(3),
                                    maxLength:maxLength(15)
                                }}/>
                                <Errors className="text-danger" model=".lastname" show="touched" messages={{
                                    required:'required',
                                    minLength:"must be more 3 charcter",
                                    maxLength:"must be less then 15 "
                                }}></Errors>
                            </Col>
                        </Row>

                        <Row className="form-group">
                       
                            <Label for='telnum' md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text model=".telnum" id="telnum" name="telnum"
                                 placeholder="tel. Number" 
                                className="form-control"
                                validators={{
                                    required,
                                    minLength:minLength(3),
                                    maxLength:maxLength(15),
                                    isNumber
                                }}/>
                                <Errors className="text-danger" model=".telnum" show="touched" messages={{
                                    required:'required',
                                    minLength:"must be more 3 charcter",
                                    maxLength:"must be less then 15 ",
                                    isNumber:"Must be number only"
                                }}></Errors>
                            </Col>
                            </Row>
                        <Row className="form-group">
                            <Label for='email' md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model=".email" id="email" name="email" placeholder="Email"
                                className="form-control"
                                validators={{
                                    required,
                                    validEmail,
                                    
                                }}
                                
                                />
                                <Errors className="text-danger" model=".email" show="touched" messages={{
                                    required:'required',
                                    validEmail : "Invalid Email"                                    
                                }}>

                                </Errors>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:6,offset:2}}>
                                <div className='form-check'>
                                    <Label check>
                                        <Control.checkbox  model=".agree" type='checkbox' name='agree' />{' '}<strong> May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>
                            <Col md={{size:3,offset:1}}>
                                <Control.select model=".contacttype" type="select" name="contactType" className="control-select ">
                                    <option>Tel. </option>
                                    <option>Email</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label for='feedback' md={2}>Your feedback</Label>
                            <Col md={10}>
                                <Control.textarea model=".message" type="textarea" id="feedback" name="feedback" rows="12" className="form-control"></Control.textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10,offset:2}}>
                                <Button color="primary" type="submit">send Feedback</Button>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>
        </div>
    );
}
}

export default Contact;