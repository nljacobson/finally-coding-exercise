import http from "../http-common";
import {React, useState } from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';
import moment from 'moment'
export default function TransactionView({id}){
    const [transaction_data, set_transaction_data] = useState([]);
    const [search_new, set_search_new] = useState([true])
    //Do query on django database for transactions
    if (search_new) {
        http.get('/myTransactions/', {
            params:
                { id: id }
        })
            .then(function (response) {       
                set_search_new(false)       
                set_transaction_data(process_transaction_data(response.data))
            })
            .catch(function (response) {
            })
    }
    const columns = [
        {field: 'id', width: 75, headerName: 'ID', headerAlign: 'center', align :'center'},
        {field: 'date', width: 175, headerName: 'Date', headerAlign: 'center', align :'center'},
        {field: 'type', width: 175, headerName: 'Transaction Type', headerAlign: 'center', align :'center'},
        {field: 'account_number', width: 175, headerName: 'Account Number', headerAlign: 'center', align :'center'},
        {field: 'note', width:175, headerName: 'Note', headerAlign: 'center', align :'center'},
        {field: 'amount', width:175, headerName: 'Amount', headerAlign: 'center', align :'center'},
    ]
    return(
        <Box
        margin={4}
        sx = {{ 
            height:1000,
            width:950,
            fontWeight:'bold',
            '& .greyHeader': {
                backgroundColor: 'rgba(156, 156, 156, .22)'
            },
        }}
        >
        <DataGrid
        showCellVerticalBorder = {true}
        showColumnVerticalBorder = {true}
        autoPageSize = {true}
        rows={transaction_data}
        columns={columns}
        headerClassName={'greyHeader'}
        />
        </Box>
    )
}

function process_transaction_data(transaction_data){
    var transactions = []
    for (var account_iter = 0; account_iter < transaction_data.length; account_iter++){
        var current_account_data = transaction_data[account_iter]
        for (var transaction_iter = 0; transaction_iter < current_account_data.length; transaction_iter++){
            var current_transaction_data = current_account_data[transaction_iter]
            //Process date string, and reformat into 'MonthName Day, Year
            var date = moment(current_transaction_data.date)
            console.log(current_transaction_data.account_number)
            transactions.push({
                'id':current_transaction_data.id,
                'date':date.format('MMMM D, YYYY'),
                'type':current_transaction_data.transaction_type ? 'CREDIT' : 'DEBIT',
                'account_number': "***" + current_transaction_data.account_id.slice(-4),
                'note': current_transaction_data.note,
                'amount': (current_transaction_data.transaction_type ? '+' : '-') + (current_transaction_data.amount/100).toFixed(2)
            })
        }
    }
    return transactions
}