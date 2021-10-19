import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
export const AuthRouter = () => {




    return (
        <>
            <Switch>

                <Route exact path="/auth/login" component={ LoginScreen }/>
                <Route exact path="/auth/register" component={ RegisterScreen }/>

            </Switch>
        </>
    )
}
