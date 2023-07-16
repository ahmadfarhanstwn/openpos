<?php
namespace App\Domains\Products\Repository;

use App\Domains\Products\Repository\IProductRepository;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ProductRepository implements IProductRepository
{
    public function __construct(private Product $productModel)
    {
    }
    
    public function index(
        int $currentPage, 
        int $perPage,
        string $productBarcode, 
        string $productName, 
        string $productUnit,
        string $productCategory
    )
    {
        return $this->productModel
            ->join('product_categories', 'product_categories.category_id', '=', 'products.category_id')
            ->join('product_units', 'product_units.unit_id', '=', 'products.unit_id')
            ->select('products.*', 'product_categories.category_name', 'product_units.unit_name')
            ->where([
                ['products.is_deleted', '=', 'N'],
                ['products.product_barcode', 'LIKE', '%'.$productBarcode.'%'],
                ['products.product_name', 'LIKE', '%'.$productName.'%'],
                ['product_units.unit_name', 'LIKE', '%'.$productUnit.'%'],
                ['product_categories.category_name', 'LIKE', '%'.$productCategory.'%'],
            ])
            ->paginate($perPage, ['*'], 'page', $currentPage);
    }

    public function getById(int $id)
    {
        try {
            return DB::table('products')
                ->join('product_units', 'products.unit_id', '=', 'product_units.unit_id')
                ->select('products.*', 'product_units.unit_name as unit_name')
                ->where('product_id', '=', $id)
                ->first();
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getByQuery(string $query)
    {
        try {
            return $this->productModel
                ->where('product_name', 'like', '%'.$query.'%')
                ->where('is_deleted', '=', 'N')
                ->take(5)
                ->get(['product_id', 'product_name']);
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function store(array $request = array(), int $userId)
    {
        $newProduct = new $this->productModel;
        $newProduct->product_barcode = $request['product_barcode'];
        $newProduct->product_name = $request['product_name'];
        $newProduct->unit_id = $request['unit_id'];
        $newProduct->category_id = $request['category_id'];
        $newProduct->unit_in_stock = 0;
        $newProduct->product_price = $request['product_price'];
        $newProduct->discount_percentage = $request['discount_percentage'];
        $newProduct->user_id = $userId;
        $newProduct->is_deleted = 'N';
        $newProduct->save();

        return $newProduct;
    }

    public function update(array $request = array(), int $id)
    {
        try {
            $product = $this->productModel->findOrFail($id);
            $product->product_barcode = $request['product_barcode'];
            $product->product_name = $request['product_name'];
            $product->unit_id = $request['unit_id'];
            $product->category_id = $request['category_id'];
            $product->product_price = $request['product_price'];
            $product->discount_percentage = $request['discount_percentage'];
            $product->save();
            
            return $product;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function increaseStock(int $id, int $amount)
    {
        try {
            $product = $this->productModel->findOrFail($id);

            $product->unit_in_stock += $amount;
            $product->save();

            return $product;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function decreaseStock(int $id, int $amount)
    {
        try {
            $product = $this->productModel->findOrFail($id);

            if ($product->unit_in_stock < $amount) {
                throw new \Exception("Amount is greater than stock", Response::HTTP_BAD_REQUEST);
            }

            $product->unit_in_stock -= $amount;
            $product->save();

            return $product;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function deleteById(int $id)
    {
        try {
            $product = $this->productModel->findOrFail($id);

            $product->is_deleted = 'Y';
            $product->save();

            return $product;
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}