import { useAppSelector } from '../../../../redux/store';
import { TableCell, TableRow, Typography } from '@mui/material';
import FlexBetween from '../../../../components/FlexBetween';
import { DeleteTransactionDetail } from './DeleteTransactionDetail';

const TransactionDetailsRow = () => {
    const transactionDetails = useAppSelector((state) => state.transactionState.transactionDetails)
    
    return (
        <>
            {transactionDetails.map((transactionDetail, index) => (
                <TableRow key={transactionDetail.transaction_detail_id} hover>
                    <TableCell key='no'>
                        <Typography>{index+1}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{transactionDetail.product_name}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography>{transactionDetail.unit_in_stock.toString()}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{transactionDetail.unit_name}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography>{transactionDetail.quantity.toString()}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography>{transactionDetail.product_price.toString()}</Typography>
                    </TableCell>
                    <TableCell>
                        <FlexBetween>
                            <Typography>%</Typography>
                            <Typography align='left'>{transactionDetail.discount.toString()}</Typography>
                        </FlexBetween>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography>{transactionDetail.subtotal.toString()}</Typography>
                    </TableCell>
                    <TableCell>
                        <DeleteTransactionDetail 
                            transaction_id={transactionDetail.transaction_id} 
                            transaction_detail_id={transactionDetail.transaction_detail_id}
                            no={index+1}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default TransactionDetailsRow