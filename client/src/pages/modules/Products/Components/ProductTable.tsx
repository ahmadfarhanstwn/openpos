import React, {useEffect, useState} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPaginateProductsQuery } from '../../../../redux/api/productApi';
import { IProduct } from '../../../../redux/api/types';
// import { createFakeServer } from '@mui/x-data-grid-generator';

// const SERVER_OPTIONS = {
//   useCursorPagination: false,
// };

// const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

const columns: GridColDef[] = [
  // Define your columns
  { field: 'product_id', headerName: 'Product ID', width: 100 },
  { field: 'product_barcode', headerName: 'Barcode', width: 150 },
  { field: 'product_name', headerName: 'Name', width: 150 },
  { field: 'unit_in_stock', headerName: 'Stock', width: 50 },
  { field: 'product_price', headerName: 'Price', width: 100 },
  { field: 'discount_percentage', headerName: 'Discount (%)', width: 50 },
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