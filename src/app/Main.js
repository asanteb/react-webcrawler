import React from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import {observer} from 'mobx-react'
import Home from './Home.js'

@observer
export default class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={() => (<Home store={this.props.store}/>)} />
      </Router>
    )
  }
}

// SAMPLE ROUTES FOR EXAMPLE //
// <Route path="/room/:id" component={() => (<Room store={this.props.store}/>)}/>
// <Route path="/about" component={About}/>
// <Route path="/contact" component={Contact}/>