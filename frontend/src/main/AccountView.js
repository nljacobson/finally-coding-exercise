import http from "../http-common";
import React from 'react';
import { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material'
function process_account_data(account_data, setToggle) {
    var column_items = [];
    var account_data_length = account_data.length;
    const max_columns = 2;
    //Assemble grid items to display
    for (var i = 0; i < account_data_length; i++) {
        //Assembly a row of items
        var row_items = [];
        for (var j = 0; j < max_columns; j++) {
            if (i < account_data_length) {
                row_items.push(
                    <Grid item key={i}>
                        <Account
                            account_items={account_data[i]}
                            setToggle={setToggle}>
                        </Account>
                    </Grid>
                )
                if (j < max_columns - 1) {
                    i++
                }
            }
        }
        column_items.push(
            <Grid item
                key={'account_row' + i}>
                <Grid container>
                    {row_items}
                </Grid>
            </Grid>
        )
    }
    return column_items;
}
export default function AccountView({ id, setToggle }) {
    const [account_data, set_account_data] = useState([]);
    const [search_new, set_search_new] = useState([]);
    //Do query on django database for accounts
    if (search_new) {
        http.get('/myAccounts/', {
            params:
                { id: id }
        })
            .then(function (response) {
                set_search_new(false)
                set_account_data(response.data)
            })
            .catch(function (response) {
            })
    }
    var column_items = process_account_data(account_data, setToggle)
    return (<Grid container
        justify="space-around"
        direction='column'
    >
        {column_items}
    </Grid>
    )
}

function Account({ account_items, setToggle }) {
    var account_number = account_items.account_number
    var balance_int = account_items.current_balance
    var current_balance = ""
    //Set state function for view transactions button
    const setToggleFalse = () => {
        setToggle(false)
    }
    //Case of balance less than 1,000
    if (balance_int < 100000) {
        current_balance = "$" + (balance_int / 100).toFixed(2)
    }
    //Case of balance greater than 1,000
    else {
        current_balance = "$" + balance_int / 100
        for (var i = current_balance.length - 3; i > 1; i -= 3) {
            current_balance = current_balance.slice(0, i) + "," + current_balance.slice(i, current_balance.length)
        }
    }
    return (
        <Box
            sx={{
                m: 2,
                width: '360px',
                height: '200px',
                border: 1,
                borderColor: 'black',
            }}
        >
            <Grid container
                margin={1}
            >
                <Grid item>
                    <Typography variant='h5'>Account Number</Typography>
                    <Typography variant='p'>{account_number}</Typography>
                </Grid>
                <Grid item
                    paddingTop={4}>
                    <Grid container
                        direction="row"
                        spacing={10}>
                        <Grid item>
                            <Box display="flex"
                                justifyContent="flex-start">
                                <Typography
                                    variant='h6'
                                >
                                    Current Balance
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box display="flex"
                                justifyContent="flex-end">
                                <Typography
                                    variant='h6'
                                >
                                    {current_balance}
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item
                    marginTop={2}
                    sm={11}>
                    <Box display="flex"
                        justifyContent='flex-end'>
                        <Typography
                            variant='p1'
                            color = "primary"
                            fontWeight = "fontWeightMedium"
                            sx = {{textDecoration: 'underline',
                                    cursor: 'pointer'}}
                            onClick={setToggleFalse}>
                            View Transactions
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}