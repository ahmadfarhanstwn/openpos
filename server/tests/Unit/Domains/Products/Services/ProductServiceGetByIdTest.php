<?php

namespace Tests\Unit\Domains\Products\Service;

use App\Domains\Products\Repository\ProductRepository;
use App\Domains\Products\Service\ProductService;
use Illuminate\Http\Response;
use Mockery;
use Tests\TestCase;

class ProductServieGetByIdTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();   
    }

    public function test_get_by_id_success() : void
    {
        //arrange
        $id = 1;
        $expectedData = [
            "product_id" => 1,
            "product_barcode" => "AJKJKS203",
            "product_name"=> "Sangobion",
            "unit_id"=> 1,
            "category_id"=> 1,
            "unit_in_stock"=> 0,
            "product_price"=> 2000,
            "discount_percentage"=> 0,
            "user_id"=> 1,
            "is_deleted"=> "N"
        ];
        $expectedResponse = [
            "message" => "Success",
            "data" => $expectedData
        ];

        $productRepositoryMock = Mockery::mock(ProductRepository::class);

        $productRepositoryMock
            ->shouldReceive('getById')
            ->once()
            ->with($id)
            ->andReturn($expectedData);

        $productService = new ProductService($productRepositoryMock);

         // act
         $response = $productService->getById($id);
        
         //assert
         $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
         $this->assertEquals($expectedResponse, json_decode($response->getContent(), true));
    }
}