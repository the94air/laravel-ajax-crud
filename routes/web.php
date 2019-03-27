<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Home route
Route::get('/', 'HomeController@index')->name('index');

// Items CRUD routes
Route::get('/items', 'ItemController@index')->name('items.index');
Route::post('/items', 'ItemController@store')->name('items.store');
Route::get('/items/{item}', 'ItemController@show')->name('items.show');
Route::patch('/items/{item}', 'ItemController@update')->name('items.update');
Route::delete('/items/{item}', 'ItemController@destroy')->name('items.destroy');
