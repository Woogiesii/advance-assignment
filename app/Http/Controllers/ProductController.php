<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProductList() {
        $path = base_path() . "mocking/data.json";
        $json = json_decode(file_get_contents($path), true);
        return response()->json($json);
    }
}