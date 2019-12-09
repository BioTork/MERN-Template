//code to hide authenticated components borrowed and tweaked from Bryant Wilkins: https://github.com/Bryant1-Dev/CEN3031-presentation
//code for navbar borrowed and tweaked from React-Bootstrap: https://react-bootstrap.github.io/components/navbar/

import React from 'react';
//import { Link } from 'react-router-dom';
import './Header.css';
import { Navbar, Nav, Button, Dropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logout from "../Logout/Logout";
import { HashLink as Link } from 'react-router-hash-link';

class Header extends React.Component {
    constructor(props) {
        //Necessary for class components
        super(props);

        this.logout = this.logout.bind(this);

    }

    logout() {
        this.props.logout("/api/users/logout");
    };

    render() {
        //Header component which is a Navbar, with links to different pages in dropdown format
        return (
            <div className='topnav'>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/home">BioTork
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <div>
                                <Link to = "/home">
                                    <Button className="navButton">Home</Button>
                                </Link>
                            </div>
                            <Dropdown >
                                <Link to ="/about">
                                    <Button className="navButton" >About Us</Button>
                                </Link>

                                <Dropdown.Toggle split id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/about#timeline">Company Timeline</Dropdown.Item>
                                    <Dropdown.Item href="/about#leadership">Leadership</Dropdown.Item>
                                    <Dropdown.Item href="/about#sponsors">Sponsors</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown >
                                <Link to="/technology">
                                    <Button className="navButton">Technology</Button>
                                </Link>
                                <Dropdown.Toggle split id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/technology#overview">Overview</Dropdown.Item>
                                    <Dropdown.Item href="/technology#advantages">BioTork Advantages</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div>
                                <Link to="/projects">
                                    <Button className="navButton">Projects</Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/publications">
                                    <Button className="navButton" >Publications</Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/press">
                                    <Button className="navButton" >Press Releases</Button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/contact">
                                    <Button className="navButton" >Contact</Button>
                                </Link>
                            </div>
                            {!this.props.loggedIn ? ( //there is an area hidden for logged in users
                                <>
                                </>
                            ) : (
                                <>
                                <div>
                                    <Link to="/admin">
                                        <Button className="navButton" >Admin</Button>
                                    </Link>
                                </div>
                                <div>
                                    <Logout logout={this.logout} />
                                </div>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;
