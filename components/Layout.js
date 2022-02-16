import React from "react"
import 'semantic-ui-css/semantic.min.css'
import Header from './Header'
import {Container} from 'semantic-ui-react'

export default props => {
  return (
    <Container>
      <Header />
      {props.children}
      <h1>Footer</h1>
    </Container>
  )
}
