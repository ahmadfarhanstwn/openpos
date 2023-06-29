<?php
namespace App\Domains\Products\Repository;

use App\Domains\Products\Repository\IProductRepository;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class ProductRepository implements IProductRepository
{
    public function index(int $currentPage, int $perPage)
    {
        return Product::where('is_deleted', 'N')
            ->paginate($perPage, ['*'], 'page', $currentPage);
    }

    public function getById(int $id)
    {
        try {
            return Product::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new \Exception('Product not found', Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function store(array $request = array(), int $userId)
    {
        $newProduct = new Product;
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
            $product = Product::findOrFail($id);
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
            $product = Product::findOrFail($id);

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
            $product = Product::findOrFail($id);

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
            $product = Product::findOrFail($id);

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