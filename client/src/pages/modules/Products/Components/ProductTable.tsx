import { IProduct } from '../../../../redux/api/Types/productTypes';
import { EditProductButton } from './EditProductButton';
import { DeleteProductButton } from './DeleteProductButton';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ITableColumn } from '../../../../types/ITableColumn';
import SearchProductFilter from './SearchProductFilter';

interface IProductTableProps {
  data: IProduct[],
  page: number,
  pageSize: number,
  onSuccess: () => void,
  handleChangePage: (event: unknown, newPage: number) => void,
  productBarcodeFilter: string,
  handleChangeProductBarcodeFilter: (value: string) => void,
  productNameFilter: string,
  handleChangeProductNameFilter: (value: string) => void,
  productUnitFilter: string,
  handleChangeProductUnitFilter: (value: string) => void,
  productCategoryFilter: string,
  handleChangeProductCategoryFilter: (value: string) => void,
  unitValues: never[],
  categoryValues: never[]
}

const ProductTable: React.FC<IProductTableProps> = (
  {
    data,
    page,
    pageSize,
    onSuccess,
    handleChangePage,
    productBarcodeFilter,
    handleChangeProductBarcodeFilter,
    productNameFilter,
    handleChangeProductNameFilter,
    productUnitFilter,
    handleChangeProductUnitFilter,
    productCategoryFilter,
    handleChangeProductCategoryFilter,
    unitValues,
    categoryValues
  }
) => {
  const columns: ITableColumn[] = [
    { id: 'product_id', label: 'Product ID', minWidth: 50 },
    { id: 'product_barcode', label: 'Barcode', minWidth: 200 },
    { id: 'product_name', label: 'Name', minWidth: 250 },
    { id: 'unit_name', label: 'Unit', minWidth: 150},
    { id: 'unit_in_stock', label: 'Stock', minWidth: 20 },
    { id: 'product_price', label: 'Price', minWidth: 100 },
    { id: 'discount_percentage', label: 'Discount (%)', minWidth: 20},
    { id: 'category_name', label: 'Category', minWidth: 150},
    { id: "actions", label: "Actions"}
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{maxHeight: 400}}>
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
            <SearchProductFilter 
              productBarcodeFilter={productBarcodeFilter}
              handleChangeProductBarcodeFilter={handleChangeProductBarcodeFilter}
              productNameFilter={productNameFilter}
              handleChangeProductNameFilter={handleChangeProductNameFilter}
              productUnitFilter={productUnitFilter}
              handleChangeProductUnitFilter={handleChangeProductUnitFilter}
              productCategoryFilter={productCategoryFilter}
              handleChangeProductCategoryFilter={handleChangeProductCategoryFilter}
              unitValues={unitValues}
              categoryValues={categoryValues}
            />
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