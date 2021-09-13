import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button, Form, FormGroup, Label, Input,Col, FormFeedback }from 'reactstrap'
import {Link} from 'react-router-dom'


class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName :'',
            telnum: '',
            email:'',
            agree:false,
            contactType:'Tel.',
            message :'',
            touched:{
                firstName: false,
                lastName:false,
                telnum:false,
                email:false
            }
        }
        this.handelInputChange=this.handelInputChange.bind(this)
        this.handelSumit= this.handelSumit.bind(this);
        this.handelBlur = this.handelBlur.bind(this)
    }
    handelInputChange(event){
        const target= event.target;
        const value=target.type ==='checkbox'? target.checked: target.value;
        const name=target.name;
        this.setState({
            [name]:value
        })

    }
    handelSumit(event){
        console.log("current state is: "+ JSON.stringify(this.state))
        alert("current state is: "+ JSON.stringify(this.state))
        event.preventDefault();

    }
    handelBlur =(field)=>(event)=>{
        this.setState({
            touched:{...this.state.touched,[field]:true}
        })
    }
    validat(firstname,lastname,tel,email){
        const errors ={
            firstName:'',
            lastName :'',
            telnum: '',
            email:''
        }
        if(this.state.touched.firstName&& firstname.length <= 3){
            errors.firstName ='First name should be more then 3 characters'
        }else{
            if(firstname.length>=10)
            errors.firstName ='First name should be less then 10 characters'
        }
        
        if(this.state.touched.lastName&& lastname.length <= 3){
            errors.lastName ='First name should be more then 3 characters'
        }else{
            if(lastname.length>=10)
            errors.lastName ='First name should be less then 10 characters'
        }
        const reg =/^\d+$/;
        if (this.state.touched.telnum && !reg.test(tel)) {
            errors.telnum = "Tel. number sould be only just numbers"
        }
        if (this.state.touched.email && email.split('').filter(x => x==='@').length !==1) {
            errors.email = "email should containe  a @ "
        }
        return errors;
    }

    render(){
        const errors= this.validat(this.state.firstName,this.state.lastName,this.state.telnum,this.state.email)
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
                    <Form onSubmit={this.handelSumit}>
                        <FormGroup row>
                            <Label for='firstName' md={2}>First Name </Label>
                            <Col md={10}>
                                <Input type="text" id="firstName" name="firstName" 
                                placeholder="First Name" value={this.state.firstName}
                                valid={errors.firstName ===''}
                                invalid={errors.firstName !==''}
                                onBlur={this.handelBlur('firstName')}
                                onChange={this.handelInputChange}></Input>
                                 <FormFeedback>{errors.firstName}</FormFeedback>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='lastName' md={2}>last Name </Label>
                            <Col md={10}>
                                <Input type="text" id="lastName" name="lastName"
                                 placeholder="last Name" value={this.state.lastName}
                                 valid={errors.lastName ===''}
                                invalid={errors.lastName !==''}
                                onBlur={this.handelBlur('lastName')}
                                 onChange={this.handelInputChange}></Input>
                                 <FormFeedback>{errors.lastName}</FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                       
                            <Label for='telnum' md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Input type="tel" id="telnum" name="telnum"
                                 placeholder="tel. Number" value={this.state.telnum}
                                 valid={errors.telnum ===''}
                                invalid={errors.telnum !==''}
                                 onBlur={this.handelBlur('telnum')}
                                 onChange={this.handelInputChange}></Input>
                                 <FormFeedback>{errors.telnum}</FormFeedback>

                            </Col>
                            </FormGroup>
                        <FormGroup row>
                            <Label for='email' md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email}
                                onBlur={this.handelBlur('email')}
                                valid={errors.email ===''}
                                invalid={errors.email !==''}
                                onChange={this.handelInputChange}></Input>
                                 <FormFeedback>{errors.email}</FormFeedback>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:6,offset:2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' name='agree' checked={this.state.agree} onChange={this.handelInputChange}/>{' '}<strong> May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size:3,offset:1}}>
                                <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handelInputChange}>
                                    <option>Tel. </option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='feedback' md={2}>Your feedback</Label>
                            <Col md={10}>
                                <Input type="textarea" id="feedback" name="feedback" rows="12" value={this.state.feedback}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:10,offset:2}}>
                                <Button color="primary" type="submit">send Feedback</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                </div>
            </div>
        </div>
    );
}
}

export default Contact;