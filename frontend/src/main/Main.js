import * as React from 'react';
import './Main.css';
import SideBar from './SideBar.js';
import AccountView from './AccountView';
import TransactionView from './TransactionView'
import {Navigate, useLocation} from 'react-router-dom';
import {Grid, Box} from '@mui/material';
//Object that contains whether user is logged in
const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default function Main() {
    const location = useLocation()
    //user_id / usernamed
    const id = location.state
    //True represents account view, false represent
    const [toggle, setToggle] = React.useState(true)
    // const state contains whether the redirect passed a valid user. 
    const state = typeof(location.state !== 'undefined')
    if(location.state != null){
        return(<Protected isLoggedIn = {state}>
                <Grid container>           
                    <Grid item>
                        <Box
                        sx={{
                            width: '15vw',
                            minWidth: '150px',
                            height: '100vh',
                            border:1,
                            borderColor:'black'}}
                        >
                            <SideBar 
                            username={id}
                            toggle = {toggle}
                            setToggle = {setToggle}
                            />
                    </Box>
                    </Grid>
                    <Grid item
                    marginTop = {5}>
                        <MainElementSwitch
                        toggle ={toggle}
                        setToggle={setToggle}
                        id = {id}/>
                    </Grid>
                </Grid>
            </Protected>)
    }
}
function MainElementSwitch({id, toggle, setToggle}){
    if (toggle){
        return(<AccountView
        id = {id}
        setToggle = {setToggle}
        />)
    }
    
    else{
        console.log(id)
       return(<TransactionView
       id = {id}/>)
    }
}