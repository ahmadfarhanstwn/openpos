import { IProduct } from '../../../../redux/api/Types/productTypes';
import { EditProductButton } from './EditProductButton';
import { DeleteProductButton } from './DeleteProductButton';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ITableColumn } from '../../../../types/ITableColumn';

interface IProductTableProps {
  data: IProduct[],
  page: number,
  pageSize: number,
  onSuccess: () => void,
  handleChangePage: (event: unknown, newPage: number) => void
}

const ProductTable: React.FC<IProductTableProps> = (
  {
    data,
    page,
    pageSize,
    onSuccess,
    handleChangePage
  }
) => {
  const columns: ITableColumn[] = [
    { id: 'product_id', label: 'Product ID' },
    { id: 'product_barcode', label: 'Barcode', minWidth: 200 },
    { id: 'product_name', label: 'Name', minWidth: 250 },
    { id: 'unit_name', label: 'Unit', minWidth: 50},
    { id: 'unit_in_stock', label: 'Stock', minWidth: 75 },
    { id: 'product_price', label: 'Price', minWidth: 100 },
    { id: 'discount_percentage', label: 'Discount (%)', minWidth: 50},
    { id: 'category_name', label: 'Category', minWidth: 100},
    { id: "actions", label: "Actions"}
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{maxHeight: 440}}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* add filtering tools */}
            {data
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.product_id}>
                    {columns.map((column) => {
                      if (column.id === 'actions') return
                      const value = row[column.id as keyof IProduct] as any;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key='actions'>
                      <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                          <EditProductButton product_id={row.product_id} onUpdateSuccess={onSuccess} />
                          <DeleteProductButton
                            product_id={row.product_id} 
                            product_name={row.product_name} 
                            onDeleteSuccess={onSuccess} 
                          />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}

export default ProductTable