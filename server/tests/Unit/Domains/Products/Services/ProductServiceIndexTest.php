<?php

namespace Tests\Unit\Domains\Products\Service;

use App\Domains\Products\Repository\ProductRepository;
use App\Domains\Products\Service\ProductService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tests\TestCase;
use Mockery;

class ProductServiceIndexTest extends TestCase
{
    protected function tearDown() : void
    {
        Mockery::close();
    }

    public function test_index_success()
    {
        // arrange
        $productRepositoryMock = Mockery::mock(ProductRepository::class);

        $currentPage = 1;
        $perPage = 10;
        $expectedData = [
            "current_page"=> 1,
            "data"=> [],
            "first_page_url"=> "http=>//localhost=>9000/api/product?page=1",
            "from"=> null,
            "last_page"=> 1,
            "last_page_url"=> "http=>//localhost=>9000/api/product?page=1",
            "links"=> [
                [
                    "url"=> null,
                    "label"=> "&laquo; Previous",
                    "active"=> false
                ],
                [
                    "url"=> "http=>//localhost=>9000/api/product?page=1",
                    "label"=> "1",
                    "active"=> true
                ],
                [
                    "url"=> null,
                    "label"=> "Next &raquo;",
                    "active"=> false
                ]
            ],
            "next_page_url"=> null,
            "path"=> "http=>//localhost=>9000/api/product",
            "per_page"=> 10,
            "prev_page_url"=> null,
            "to"=> null,
            "total"=> 0
        ];

        $expectedResponse = [
            'message' => 'Success',
            'data' => $expectedData
        ];
        
        //mock index method
        $productRepositoryMock
            ->shouldReceive('index')
            ->once()
            ->with($currentPage, $perPage)
            ->andReturn($expectedData);

        $productService = new ProductService($productRepositoryMock);

        $request = Mockery::mock(Request::class);
        $request
            ->shouldReceive('query')
            ->with('current_page', 1)
            ->andReturn($currentPage);
        $request
            ->shouldReceive('query')
            ->with('per_page', 10)
            ->andReturn($perPage);

        // act
        $response = $productService->index($request);
        
        //assert
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertEquals($expectedResponse, json_decode($response->getContent(), true));
    }

    public function test_index_current_page_is_not_numeric()
    {
        //arrange
        $currentPage = 'not_numeric';

        $productRepositoryMock = Mockery::mock(ProductRepository::class);

        $request = Mockery::mock(Request::class);
        $request
            ->shouldReceive('query')
            ->with('current_page', 1)
            ->andReturn($currentPage);

        $productService = new ProductService($productRepositoryMock);

        $expectedResponse = [
            'error' => 'current_page should be numeric'
        ];

        // act
        $response = $productService->index($request);

        //assert
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertEquals($expectedResponse, json_decode($response->getContent(), true));
    }

    public function test_index_per_page_is_not_numeric()
    {
        //arrange
        $currentPage = 1;
        $perPage = 'not_numeric';

        $productRepositoryMock = Mockery::mock(ProductRepository::class);

        $request = Mockery::mock(Request::class);
        $request
            ->shouldReceive('query')
            ->with('current_page', 1)
            ->andReturn($currentPage);
        $request
            ->shouldReceive('query')
            ->with('per_page', 10)
            ->andReturn($perPage);

        $productService = new ProductService($productRepositoryMock);

        $expectedResponse = [
            'error' => 'per_page should be numeric'
        ];

        //act
        $response = $productService->index($request);

        //assert
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
        $this->assertEquals($expectedResponse, json_decode($response->getContent(), true));
    }
}