import {Grid, Divider,Typography, Button} from '@mui/material'
import React from 'react';
export default function SideBar({username, toggle, setToggle}){
    const greeting =  'Hi, ' + username + '!';
    const setState = (new_state) => {
        setToggle(new_state)
    }
    return(
    <Grid container 
        spacing = {0}
        minWidth = {'150px'}
        direction = {'column'}
        sx={{
            margin: 0,
            alignItems:'center',
            justifyContent:'left'
        }}
    >
        <Grid item
            sx = {{
                minWidth:'150px'
            }}>
            <Typography
                margin={2}
                >
                {greeting}
            </Typography>
        </Grid>
        <Divider 
            color={"black"}
            sx= {{
                width:'15vw',
                minWidth:'150px',
            }}
        />
        <Grid item
            sx = {{margin:1}}>
            <Button
                variant = {toggle ? 'contained' : 'outlined'}
                onClick = {() => setState(true)}
                sx = {{
                    width:'12vw',
                    minWidth:'125px',
                    borderColor:'black',
                    border:'1px',
                }}
                >
                Accounts
            </Button>
        </Grid>
        <Grid item
            sx = {{margin:1}}>
            <Button
                variant = {toggle ? 'outlined' : 'contained'}
                onClick = {() => setState(false)}
                sx = {{
                    width:'12vw',
                    minWidth:'125px',
                    borderColor:'black',
                    border:'1px',
                }}
                >
                Transactions
            </Button>
        </Grid>
    </Grid>
    )
}