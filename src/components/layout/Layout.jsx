import React from 'react'
import { Container } from 'react-bootstrap'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout  = ( {children}) => {
  return (
    <div>
        <Header/>
        <Container className="main">{children}</Container>
        <Footer/>
    </div>
  )
}
