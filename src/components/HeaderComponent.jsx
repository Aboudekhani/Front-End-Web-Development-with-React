import React,{Component} from 'react'
import {Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron
,Button, Modal,ModalBody,ModalHeader, Form, FormGroup, Label,Input} from 'reactstrap'
import { NavLink}from 'react-router-dom'


class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            isNavOpen:false,
            isModalOpen :false

        }
        this.toggleNav = this.toggleNav.bind(this)
        this.toggleModal=this.toggleModal.bind(this)
        this.handelLogin=this.handelLogin.bind(this)
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen

        })
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    handelLogin(event){
        this.toggleModal();
        alert(this.username.value,this.password.value, this.remember.cheked)
        event.preventDefault();
    }
    render(){
        return(
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About Us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/menu">
                                <span className="fa fa-list fa-lg"></span> Menu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-adress-card fa-lg"></span> Contact us 
                            </NavLink>
                        </NavItem>
                    </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span>Login
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the world's best cuisine, and create unique fusion experiance. Our lipsmaking will tickle your culinary sense!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handelLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input)=>{this.username=input}}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                innerRef={(input)=>{this.password=input}}></Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" 
                                    innerRef={(input)=>{this.remember=input}}/>
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>

        );

    }

}

export default Header