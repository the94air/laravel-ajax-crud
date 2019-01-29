# Laravel AJAX CRUD Application

This is a simple example of using Laravel 5.7 and Vue 2 for creating CRUD applications with AJAX functionality.

## Demo
https://laravel-ajax-crud.herokuapp.com

## Installation
1. Clone the repository:
```bash
git clone https://github.com/the94air/Laravel-ajax
cd Laravel-ajax
```
2. Copy `.env` file:
```
cp .env.example .env
```
3. Connect to database:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
4. Install all the dependencies:
```bash
composer update
```
5. migrate the database:
```bash
php artisan migrate
```
6. Done!  

7. Optional: Install npm dependencies to modify `sass` and `vue` files:
```
npm install
npm run dev
```