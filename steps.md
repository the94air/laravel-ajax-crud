# The Ultimate Guide For Creating Laravel CRUD AJAX Application using Laravel 5.8, Vue 2, Tailwindcss, Vue-router, and Axios.
1. Installation and configurations.
2. Database model, migration, and seeds.
3. HTTP routes.
4. HTTP Controllers.
5. Form Requests and Validation.
6. Views.
7. Laravel-mix setup.
8. Tailwindcss.
10. Vue and Vue-router.
11. AJAX and Axios.

## Installation and configurations:

1. Install laravel in a new project directory:
```
composer create-project --prefer-dist laravel/laravel [Your project name]
```
<small>make sure you have [Composer](https://getcomposer.org) installed</small>

2. Install npm dependencies to compile `SASS` and `JavaScript`:
```
npm install
```
<small>make sure you have [Nodejs](https://nodejs.org) installed</small>

3. Create a new database. I am using `MySQL`:
```bash
# Login to MySQL
sudo mysql -u [MySQL Username] -p
# Create MySQL database
CREATE DATABASE [Your database name] DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. Configure Database connection and other settings in your `.env` file:
```bash
APP_NAME=CRUD
APP_ENV=local
APP_DEBUG=true
APP_URL=http://crud.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[Your Database Name]
DB_USERNAME=[Your MySQL Username]
DB_PASSWORD=[Your MySQL Password]
```
<small>📍`/.env`</small>

## Database model, migration, and seeds

1. Since we don't need the authentication system, let's copy the auth migrations to another directory inside the `database` directory so we can use them later. Let's call it `trash`.
<small>📍Copy files inside `/database/migration` to new directory `/database/trash`</small>

2. Let's create migration, factory, and resource controller for our model `Item`:
```
php artisan make:model Item --all
```

3. Let's add our table fields:
```php
public function up()
{
    Schema::create('items', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('title');
        $table->text('comment');
        $table->timestamps();
    });
}
```
<small>📍`/database/migration/xxxx_xx_xx_xxxxxx_create_items_table.php`</small>
`🔥 Pro Tip:` you can find all migration columns in the [documentation](https://laravel.com/docs/migrations#columns).

4. Make the database fields fillable in the `Item` model:
```php
class Item extends Model
{
    protected $fillable = [
        'title', 'comment',
    ];
}
```
<small>📍`/app/User.php`</small>

5. Let's add the `Item` factory for generating seeds later:
```php
$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4, true),
        'comment' => $faker->realText(200, 2),
    ];
});
```
<small>📍`/database/factories/ItemFactory.php`</small>
`🔥 Pro Tip:` you can find all the available faker formatters in the `Faker` project [README](https://github.com/fzaninotto/Faker#formatters).

6. Create database seeder for `Item` table:
```bash
php artisan make:seeder ItemsTableSeeder
```
Let's add 6 rows for example at any single seed:
```php
public function run()
{
    factory(App\Item::class, 6)->create();
}
```
<small>📍`/database/seeds/ItemsTableSeeder.php`</small>

7. Add the `Item` seeder to the project seeder:
```php
public function run()
{
    $this->call(ItemsTableSeeder::class);
}
```
<small>📍`/database/seeds/DatabaseSeeder.php`</small>

8. Now we can seed to the database using the `seeder` command:
```bash
php artisan db:seed
```

9. You should find that the data has been seeded successfuly to your database.

## HTTP routes
1. Let's create all of our routes on the `routes` directory:
```php
// :: Home Route ::
// For showing home page
Route::get('/', 'HomeController@index')->name('index');
// this also works: Route::view('/', 'index');

// :: Items CRUD Routes ::
// For getting all the items
Route::get('/items', 'ItemController@index')->name('items.index');
// For saving an item
Route::post('/items', 'ItemController@store')->name('items.store');
// For getting an item
Route::get('/items/{item}', 'ItemController@show')->name('items.show');
// For updating an item
Route::patch('/items/{item}', 'ItemController@update')->name('items.update');
// For deleting an item
Route::delete('/items/{item}', 'ItemController@destroy')->name('items.destroy');
```
<small>📍`/routes/web.php`</small>
`🔥 Pro Tip:` you can find all the available router methods in the [documentation](https://github.com/fzaninotto/Faker#formatters).
`🔥 Pro Tip:` after creating the routes then comes the `controllers` and the `views`.
`🔥 Pro Tip:` you can also add middlewares to any route you have but, for the sake of simplisity we don't don't have to add any middleware to our current routes. More about middleware in the [documentation](https://laravel.com/docs/5.8/middleware#registering-middleware).

## HTTP Controllers

1. After creating all the routes we need, let's create the home controller. As you can remember, we already created the `Item` controller when we created the `items` table migration:
```bash
php artisan make:controller HomeController
```

2. Lets add the `index` method for the home route and return the home page `view` that we will add later on:
```php
class HomeController extends Controller
{
    public function index() {
    	return view('index');
    }
}
```
<small>📍`/app/Http/Controllers/HomeController.php`</small>

4. Lets add the `item` methods for each http request. You can delete the `create` and `update` methods because we don't need them in our application:
```php
class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::orderBy('id','DESC')->get();

        return response()->json([
            'items' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = new Item;

        $item->title = $request->title;
        $item->comment = $request->comment;

        $item->save();

        return response()->json([
            'item' => $item
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return response()->json([
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $item->title = $request->title;
        $item->comment = $request->comment;

        $item->save();

        return response()->json([
            'item' => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json([
            'item' => $item
        ]);
    }
}
```
<small>📍`/app/Http/Controllers/ItemController.php`</small>
`🔥 Pro Tip:` you can find all the available Laravel eloquent methods in the [documentation](https://laravel.com/docs/5.8/eloquent#introduction).

## Form Requests and Validation
1. Some requests needs to be validated before it can goes to the database; Like the `store` and the `update` routes. let's create two form request for both routes:
```bash
php artisan make:request StoreItemRequest
php artisan make:request UpdateItemRequest
```
```php
class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:6|max:255',
            'comment' => 'required|string|min:6|max:1000',
        ];
    }
}
```
<small>📍`/app/Http/Requests/StoreItemRequest.php`</small>
```php
class UpdateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:6|max:255',
            'comment' => 'required|string|min:6|max:1000',
        ];
    }
}
```
<small>📍`/app/Http/Requests/UpdateItemRequest.php`</small>

2. Then let's add the routes to our `store` and `update` methods on the `ItemController`.
```php
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;

class ItemController extends Controller
{
	// ...

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreItemRequest $request)
    {
		// ...
    }

    // ...

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\UpdateItemRequest  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        // ...
    }

	// ...
}
```
<small>📍`/app/Http/Controllers/ItemController.php`</small>
`🔥 Pro Tip:` you can find all the available Laravel validation rules in the [documentation](https://laravel.com/docs/5.8/validation#available-validation-rules).

3. We also need to validate the route parameter `item` we used on the controller routes. The validation pattern should be added to the `RouteServiceProvider` in the `boot` method:
```php
Route::get('/items/{item}', 'ItemController@show')->name('items.show');
Route::patch('/items/{item}', 'ItemController@update')->name('items.update');
Route::delete('/items/{item}', 'ItemController@destroy')->name('items.destroy');
```
```php
/**
 * Define your route model bindings, pattern filters, etc.
 *
 * @return void
 */
public function boot()
{
    Route::pattern('item', '[0-9]+');

    parent::boot();
}
```
<small>📍`/app/Providers/RouteServiceProvider.php`</small>

## Views
