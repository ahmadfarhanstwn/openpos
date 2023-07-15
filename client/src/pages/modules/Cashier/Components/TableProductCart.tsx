import FlexBetween from '../../../../components/FlexBetween'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ITableColumn } from '../../../../types/ITableColumn';
import InputProductRowCart from './InputProductRowCart';

const TableProductCart = () => {
    const columns: ITableColumn[] = [
        { id: 'id', label: 'ID', minWidth: '5%' },
        { id: 'product_name', label: 'Name', minWidth: '25%' },
        { id: 'product_stock', label: 'Stock', minWidth: '5%' },
        { id: 'unit_name', label: 'Unit', minWidth: '10%'},
        { id: 'quantity', label: 'Quantity', minWidth: '5%' },
        { id: 'product_price', label: 'Price', minWidth: '20%' },
        { id: 'discount_percentage', label: 'Discount', minWidth: '10%'},
        { id: 'subtotal', label: 'Subtotal', minWidth: '10%'},
        { id: "action", label: "Action"}
      ];

    return (
        <FlexBetween>
            <TableContainer sx={{maxHeight: 400}}>
                <Table>
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 57, width: column.minWidth, fontWeight: 'bold' }}
                                size='small'
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <InputProductRowCart />
                    </TableBody>
                </Table>
            </TableContainer> 
        </FlexBetween>
    )
}

export default TableProductCart