import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Register from "./components/Register"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Private Route component using v5 syntax
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth()
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </AuthProvider> 
    </Router>
  )
}

export default App

