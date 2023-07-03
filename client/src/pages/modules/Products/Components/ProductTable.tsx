import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IProduct } from '../../../../redux/api/Types/productTypes';
import { DeleteProductButton, EditProductButton } from './ActionButtons';

interface IProductTableProps {
  data: IProduct[],
  isLoading: boolean,
  paginationModel: any,
  setPaginationModel: React.Dispatch<React.SetStateAction<any>>,
  rowCount: number,
  onDeleteSuccess: () => void
}

const ProductTable: React.FC<IProductTableProps> = (
  {
    data,
    isLoading,
    paginationModel,
    setPaginationModel,
    rowCount,
    onDeleteSuccess
  }
) => {
  const columns: GridColDef[] = [
    { field: 'product_id', headerName: 'Product ID' },
    { field: 'product_barcode', headerName: 'Barcode', width: 200 },
    { field: 'product_name', headerName: 'Name', width: 250 },
    { field: 'unit_name', headerName: 'Unit', width: 50},
    { field: 'unit_in_stock', headerName: 'Stock', width: 75 },
    { field: 'product_price', headerName: 'Price', width: 100 },
    { field: 'discount_percentage', headerName: 'Discount (%)', width: 50},
    { field: 'category_name', headerName: 'Category'},
    { 
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  <EditProductButton product_id={params.row.product_id} />
                  <DeleteProductButton 
                    product_id={params.row.product_id} 
                    product_name={params.row.product_name} 
                    onDeleteSuccess={onDeleteSuccess} 
                  />
              </div>
          );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data}
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