import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import '../styles/components/navbar.scss';

export const NavBar = () => {
    return (
        <BootstrapNavbar collapseOnSelect expand="md" className="navbar navbar-light bg-light" defaultExpanded={false}>
            <BootstrapNavbar.Toggle />
            <BootstrapNavbar.Collapse>
                <Nav>
                    <BootstrapNavbar.Brand className="ml-md-3" href="../">Smart Living</BootstrapNavbar.Brand>
                    <Nav.Item className="nav-item">
                        <Nav.Link href="../">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link href="../diet">Diet</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link href="../exercise">Exercise</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link href="#">Management</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link href="#">Support</Nav.Link>
                    </Nav.Item>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
        );
}