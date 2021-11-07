import React from 'react'
import {UserLogin} from '../userLogin/userLogin'
import ChatInterface from '../chatInterface/chatInterface'
import {Link, Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './layout.css'
export default class Layout extends React.Component{
    render(){
        return(<div className="layout">
        <Router>
            <Switch>
             <Redirect from="/" exact to="/login" />
             <Route path="/login" component={UserLogin} />
             <Route path="/chat-interface/:userName/:action" exact={true} component={ChatInterface} />
            </Switch>
        </Router>

        </div>)
    }
}
