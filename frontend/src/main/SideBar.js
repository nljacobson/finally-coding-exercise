import {Grid, Divider, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material'
export default function SideBar({username, toggle, setToggle}){
    const greeting =  'Hi, ' + username + '!';
    const handleToggle = (event, newToggle) => {
        setToggle(newToggle);
      };
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
            sx= {{
                width:'15vw',
                minWidth:'150px'
            }}
        />
        <Grid item
            sx = {{margin:1}}>
            <ToggleButtonGroup
                color = 'primary'
                orientation = 'vertical'
                exclusive
                value={toggle}
                onChange={handleToggle}
                >
                <ToggleButton 
                variant={'contained'}
                value={'accounts'}
                width = '15vw'
                onClick={setToggle}
                margin={2}
                style={{minWidth: '13vw'}}
                >
                    Accounts
                </ToggleButton>
                <ToggleButton 
                variant={'contained'}
                value={'transactions'}
                width = '15vw'
                onClick={setToggle}
                padding={2}
                style={{minWidth: '13vw'}}
                >
                    Transactions
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    </Grid>
    )
}