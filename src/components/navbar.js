import React from 'react'
import NavbarItem from './navbarItem'

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="https://bootswatch.com" className="navbar-brand">Socin</a>
                <button className="mavbar-toogler" type="button" 
                        data-toogle="collapse" data-target="#navbarResponsive" 
                        data-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toogle navigation">
                    <span className="navbar-toogler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">                    
                    <ul className="navbar-nav">
                        <NavbarItem href="/login" label="Login" />
                        <NavbarItem href="/register-users" label="Registrar Usuários" />                        
                        <NavbarItem href="/register-users/:id" label="Atualizar/Deletar Usuário" />                               
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar