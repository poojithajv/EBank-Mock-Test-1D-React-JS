import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)
export default App
