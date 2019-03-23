# Laravel AJAX CRUD Application

This is a simple example of using Laravel 5.8 and Vue 2 for creating CRUD applications with AJAX functionality.

## How To Build This Project From Zero
**[The Ultimate Guide For Creating Laravel CRUD AJAX Application using Laravel 5.8, Vue 2, Tailwindcss, Vue-router, and Axios](./steps.md)**

## Demo
https://laravel-ajax-crud.herokuapp.com

## Installation

1. Clone the repository:
```bash
git clone https://github.com/the94air/laravel-ajax-crud
cd laravel-ajax-crud
```

2. Copy `.env` file:
```
cp .env.example .env
```

3. Connect to database:
```bash
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
```bash
npm install
npm run dev
```
