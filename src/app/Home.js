import React from 'react'
import {BrowserRouter as Router, Route, Link, NavLink, Redirect} from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { Scrollbars } from 'react-custom-scrollbars'
import Particles from 'react-particles-js'
import particleConfig from './particles.json'

// var dev_mode = false
// var DOMAIN_URL = 'https://geekenforcer.com'
// if(dev_mode){
//   DOMAIN_URL = 'http://127.0.0.1:300'
// }

const values = [
  'thrills',
  'excitement',
  'lunacy',
  'geekiness',
  'joy',
  'innovation',
  'lols',
  'education',
  'insanity',
  '🍣',
  'craftmanship',
  '@#$!',
  'chaos',
  'splendor',
  'madness',
]

const projects = [
  {title: 'YamoChat', link: 'https://yamochat.im'},
  {title: 'PGP-Chat', link: 'https://github.com/asantebuil/pgp-chat'},
  {title: 'YamoBot', link: 'https://github.com/asantebuil/YamoBot'},
  {title: 'GoFundMe- Scraper', link: 'https://github.com/asantebuil/gofundme-scraper'},
  {title: 'Hearthstone Trivia Bot', link: 'https://github.com/asantebuil/hearthstone-trivia-bot'},
  {title: 'WordScramble-JAVA', link: 'https://github.com/asantebuil/WordScramble'},
  {title: 'WebRTC-Mafkr', link: 'https://github.com/asantebuil/WebRTC-Mafkr'}
]

@observer
export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rollingText: values[0],
      index: 0,
      projects: projects,
    }
  }

  componentDidMount(){
      this.textChange()
      this.timerID = setInterval(
      ()=> this.textChange(), 750
    )
  }

  componentWillUnMount(){
    clearInterval(this.timerID)
  }

  textChange = () =>{
    let index = this.state.index
    if (index == values.length-1){
      index = 0
    }
    this.setState({rollingText: values[index], index: index+1})
  }

  render() {
    return (
      <div id='container'>
        <Particles params={particleConfig}/>
          <div id='overlay'>
            <div className="Header">
              <img style={{maxHeight: '100%', maxWidth: '100%', zoom:'2'}} src='https://s3-us-west-2.amazonaws.com/geekenforcer.com/header_red.png'/>
              <h4 style={{margin: '0px'}}>Creating things for the {this.state.rollingText}</h4>
            </div>
            <div className="HomeBody">
              <Scrollbars universal>
              <div style={{padding: '10px'}}>
                <Button.Group color='red' vertical fluid>
                  {
                    this.state.projects.map((obj, i)=>{
                      return(
                        <Button key={i} color="red" onClick={()=>window.location.assign(obj.link)}>{obj.title}</Button>
                      )
                    })
                  }
                </Button.Group>
                </div>
              </Scrollbars>
            </div>
            <div className="Social">
              <div  style={{margin: '0 auto', height: '100%'}} >
                <Image href='https://github.com/asantebuil' style={{padding:'3px'}} width='40' height='40' src='https://s3-us-west-2.amazonaws.com/geekenforcer.com/github.png'/>
                <Image href='https://twitter.com/yamoshotto' style={{padding:'3px'}} width='40' height='40' src='https://s3-us-west-2.amazonaws.com/geekenforcer.com/twitter.png'/>
              <a style={{fontSize: '100%', float: 'right'}} href="mailto:asante@geekenforcer.com">asante@geekenforcer.com</a>
              </div>
            </div>
          </div>
      </div>
    )
  }
}