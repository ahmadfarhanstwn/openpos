import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IProduct } from '../../../../redux/api/types';

const columns: GridColDef[] = [
  { field: 'product_id', headerName: 'Product ID' },
  { field: 'product_barcode', headerName: 'Barcode', width: 200 },
  { field: 'product_name', headerName: 'Name', width: 250 },
  { field: 'unit_name', headerName: 'Unit', width: 50},
  { field: 'unit_in_stock', headerName: 'Stock', width: 75 },
  { field: 'product_price', headerName: 'Price', width: 100 },
  { field: 'discount_percentage', headerName: 'Discount (%)', width: 50},
  { field: 'category_name', headerName: 'Category'},
];

interface IProductTableProps {
  data: IProduct[],
  isLoading: boolean,
  paginationModel: any,
  setPaginationModel: React.Dispatch<React.SetStateAction<any>>,
  rowCount: number
}

const ProductTable: React.FC<IProductTableProps> = (
  {
    data,
    isLoading,
    paginationModel,
    setPaginationModel,
    rowCount
  }
) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
        // {...data}
        rowCount={rowCount}
        loading={isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}

export default ProductTable