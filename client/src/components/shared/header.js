import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
        }
    }

    renderAuthButtons = () => {
        const { isAuth } = this.props.auth;
        if (!isAuth) {
            return (
                <div className="responsive-header">
                    <NavItem>
                        <NavLink href="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                </div>
            );
        } else {
            return (
                <div className="responsive-header">
                    <NavItem>
                        <NavLink href="/account-settings">Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/upload">Upload</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/"><div onClick={() => this.props.dispatch(logoutUser())}>Logout</div></NavLink>
                    </NavItem>
                </div>
            )
        }

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <div>
                <Navbar color="transparent" className="port-navbar port-default absolute" light expand="md">
                    <NavbarBrand href="/">
                        <div className="navbar-brand">
                            <span style={{ color: 'black', fontSize: '45px', fontFamily: 'Dancing Script, cursive' }}>Camagru</span>
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.renderAuthButtons()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Header);