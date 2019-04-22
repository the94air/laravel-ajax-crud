# The Ultimate Guide For Creating Laravel CRUD AJAX Application using Laravel 5.8, Vue 2, Tailwindcss, Vue-router, and Axios.
1. Installation and configurations.
2. Database model, migration, and seeds.
3. HTTP routes.
4. HTTP Controllers.
5. Form Requests and Validation.
6. Views.
7. Bundling assets.
8. Tailwindcss.
10. Vue and Vue-router.
11. AJAX and Axios.

## Installation and configurations:

1. Install laravel in a new project directory:
```bash
composer create-project --prefer-dist laravel/laravel [Your project name]
```
`🔥 Pro Tip:` make sure you have [Composer](https://getcomposer.org) installed.

2. Install NPM dependencies to compile `SASS` and `JavaScript`:
```bash
npm install
```
`🔥 Pro Tip:` make sure you have [Nodejs](https://nodejs.org) installed.

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
<small>📍`.env`</small>

## Database model, migration, and seeds

1. Since we don't need the authentication system, let's copy the auth migrations to another directory inside the `database` directory so we can use them later. Let's call it `trash`.  
<small>📍Copy files inside `database/migration` to new directory `database/trash`</small>

2. Let's create a migration, factory, and resource controller for our model `Item`:
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
<small>📍`database/migration/xxxx_xx_xx_xxxxxx_create_items_table.php`</small>  
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
<small>📍`app/Item.php`</small>

5. Let's add the `Item` factory for generating seeds later:
```php
$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4, true),
        'comment' => $faker->realText(200, 2),
    ];
});
```
<small>📍`database/factories/ItemFactory.php`</small>  
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
<small>📍`database/seeds/ItemsTableSeeder.php`</small>

7. Add the `Item` seeder to the project seeder:
```php
public function run()
{
    $this->call(ItemsTableSeeder::class);
}
```
<small>📍`database/seeds/DatabaseSeeder.php`</small>

8. Now we can seed to the database using the `seeder` command:
```bash
php artisan db:seed
```

9. You should find that the data has been seeded successfully to your database.

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
<small>📍`routes/web.php`</small>  
`🔥 Pro Tip:` you can find all the available router methods in the [documentation](https://github.com/fzaninotto/Faker#formatters).  
`🔥 Pro Tip:` after creating the routes then comes the `controllers` and the `views`.  
`🔥 Pro Tip:` you can also add middlewares to any route you have but, for the sake of simplisity we don't don't have to add any middleware to our current routes. More about middleware in the [documentation](https://laravel.com/docs/5.8/middleware#registering-middleware).

## HTTP Controllers

1. After creating all the routes we need, let's create the home controller. As you can remember, we already created the `Item` controller when we created the `items` table migration:
```bash
php artisan make:controller HomeController
```

2. Let's add the `index` method for the home route and return the home page `view` that we will add later on:
```php
class HomeController extends Controller
{
    public function index() {
        return view('index');
    }
}
```
<small>📍`app/Http/Controllers/HomeController.php`</small>

4. Let's add the `item` methods for each HTTP request. You can delete the `create` and `update` methods because we don't need them in our application:
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
<small>📍`app/Http/Controllers/ItemController.php`</small>  
`🔥 Pro Tip:` you can find all the available Laravel eloquent methods in the [documentation](https://laravel.com/docs/5.8/eloquent#introduction).

## Form Requests and Validation

1. Some requests need to be validated before it can go to the database; Like the `store` and the `update` routes. let's create two form request for both routes:
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
<small>📍`app/Http/Requests/StoreItemRequest.php`</small>
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
<small>📍`app/Http/Requests/UpdateItemRequest.php`</small>

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
<small>📍`app/Http/Controllers/ItemController.php`</small>  
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
<small>📍`app/Providers/RouteServiceProvider.php`</small>

## Views

1. We only need a single home page to show all the items. let's create a new `blade` view:
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="description" content="A simple example of using Laravel 5.8 and Vue 2 for creating CRUD applications with AJAX functionality.">

    <title>Laravel AJAX CRUD Application</title>

    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
    <script>
        WebFont.load({
            google:  {
                families:  ['Source Sans Pro:400,600']
            }
        });
    </script>

    <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
</head>
<body>

    

    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
```
<small>📍`resources/views/index.blade.php`</small>  
`🔥 Pro Tip:` you can remove the `welcome.blade.php` view because we don't need it in our project.

## Bundling assets

1. We need to prepare our `SASS` and `JavaScript` bundling using `laravel-mix`. the assets bundling `input` and `output` path are already configured in `webpack.mix.js`:
```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```
<small>📍`webpack.mix.js`</small>

2. Let's remove the files inside the `resources/js` and `resources/sass` directory. After that create empty files as follow; `resources/js/app.js` and `resources/sass/app.scss`.

## Tailwindcss

1. We will be using the power of `tailwindcss` to write `SASS`. let's install `tailwindcss` using NPM:
```bash
npm i tailwindcss --save-dev
```
`🔥 Pro Tip:` To find more about how to use `tailwindcss`, check out the [documentation](https://tailwindcss.com/docs/installation).

2. To use `tailwindcss`, we need to generate a new `tailwind.js` configuration file:
```bash
npx tailwind init
```

3. After that let's add the main style structure to our `app.scss`:
```scss
/**
 * This injects Tailwind's base styles, which is a combination of
 * Normalize.css and some additional base styles.
 */
@tailwind preflight;

/**
 * This injects any component classes registered by plugins.
 */
@tailwind components;

/**
 * Here you would add any of your custom component classes; stuff that you'd
 * want loaded *before* the utilities so that the utilities could still
 * override them.
 */
@import "components";

/**
 * This injects all of Tailwind's utility classes, generated based on your
 * config file.
 */
@tailwind utilities;

/**
 * Here you would add any custom utilities you need that don't come out of the
 * box with Tailwind.
 */
```
<small>📍`resources/sass/app.scss`</small>

4. The last step is to add the tailwindcss plugin to the laravel-mix `post-css`:
```js
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss('./tailwind.js'),
        ],
    });
```
<small>📍`webpack.mix.js`</small>

5. We are ready to start writing `SASS` by running the development script:
```bash
npm run watch
```

7. Because this isn't a `SASS` tutorial, you can find the `SASS` files on the project [GitHub](https://github.com/the94air/laravel-ajax-crud/tree/master/resources) repository.  
`🔥 Pro Tip:` If you want to find more about `SASS` language, check out the [documentation](https://sass-lang.com/guide).

## Vue and Vue-router

1. To create our single page application for the CRUD functionality, we need to install `vue` via NPM:
```bash
npm i vue --save
```

2. We need to add the mounting point that `vue` needs to render our components:
```diff
<body>

-
+    <div id="app"></div>

    <script src="{{ mix('js/app.js') }}"></script>
</body>
```
<small>📍`resources/views/index.blade.php`</small>

3. We can start by creating a new `vue` instance in our `app.js` file. We also gonna need to create 2 other files, One for the main application component called `App.vue` inside directory `Main`. The other for importing all javascript libraries before we mount the app called `boorstrap.js`:
```js
import Vue from 'vue';
import App from './Main/App';

require('./bootstrap');

const app = new Vue({
    el: '#app',
    render: h => h(App),
});

export default app;
```
<small>📍`resources/js/app.js`</small>

4. First we start with the `App` component.
```html
<template>
    <div>
        <Navbar />
        <Content />
        <Ads />
        <Footer />
        <Notifications />
    </div>
</template>

<script>
    import Navbar from '../Components/Navbar';
    import Content from '../Components/Content';
    import Ads from '../Components/Ads';
    import Footer from '../Components/Footer';
    import Notifications from '../Components/Notifications';

    export default {
        components: { Navbar, Content, Ads, Footer, Notifications, },
    }
</script>
```
<small>📍`resources/js/Main/App.vue`</small>

5. The site contain multiple components like `Navbar`, `Content`, `Ads`, `Footer`, and `Notifications`. You can find the code of these component on [GitHub](https://github.com/the94air/laravel-ajax-crud/tree/master/resources/js/Components). Some of these components have dependancies and we need to install them and configure them in our `bootstrap.js`. We also need to create `form.js` for notifications and form errors functions:
```bash
npm i -S @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons axios vue-notification
```
```js
import Vue from 'vue';
import { dom, config, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar, faSyncAlt, faArrowLeft, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import Loading from './Components/Loading';
import Notifications from 'vue-notification';
import form from './form';

library.add(faGithub, faTwitter, faStar, faSyncAlt, faArrowLeft, faCircleNotch, faTimes);
Vue.component('Fa', FontAwesomeIcon);
config.searchPseudoElements = true;
dom.watch();

Vue.use(Notifications);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response === undefined || error.request.status === 500) {
        form.fail();
    }
    return Promise.reject(error);
});

Vue.component('Loading', Loading);
```
<small>📍`resources/js/bootstrap.js`</small>
```js
import app from './app';

const form = {
    note: (message, duration) => {
        return app.$notify({
            group: 'notes',
            text: message,
            duration: duration,
        });
    },
    fail: () => {
        return app.$notify({
            group: 'notes',
            text: 'Something went wrong while processing your request!',
            duration: 10000,
        });
    },
    errors: (err) => {
        if(err.response.status === 422) {
            return err.response.data.errors;
        }
    },
};

export default form;
```
<small>📍`resources/js/form.js`</small>

5. A small change needs to be added to fix the `container` class alignment. Currently, the `container` is aligned to the left and we need to have it centered. To do so, we will edit the `tailwindcss` configuration:
```diff
plugins: [
    require('tailwindcss/plugins/container')({
-        // center: true,
+        center: true,
-        // padding: '1rem',
+        padding: '1rem',
    }),
],
```
<small>📍`tailwind.js`</small>

6. As you will notice, the images will show up on the index page. you will need to get the images from [GitHub](https://github.com/the94air/laravel-ajax-crud/tree/master/resources/images). Copy all the images to `resources/images` and setup bundling inside of `webpack.mix.js`:
```diff
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
+    .copyDirectory('resources/images', 'public/images')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss('./tailwind.js'),
        ],
    });
```
<small>📍`webpack.mix.js`</small>

6. Now, we are going to focus on the `CRUD` component located inside of the `Content` component. We will be using `vue-router` to switch between the CRUD components. We need to install `vue-router` and create a configuration file called `router.js`, so it can be added to our `vue` instance in `app.js`. The `CRUD` component will be our router entry:
```bash
npm i vue-router --save
```
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './Components/Items/Index';
import Create from './Components/Items/Create';
import Show from './Components/Items/Show';
import Edit from './Components/Items/Edit';
import Delete from './Components/Items/Delete';
import NotFound from './Components/NotFound';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index, name: 'items.index', },
    { path: '/create', component: Create, name: 'items.create', },
    { path: '/:id', component: Show, name: 'items.show', },
    { path: '/:id/edit', component: Edit, name: 'items.edit', },
    { path: '/:id/delete', component: Delete, name: 'items.delete', },
    { path: '*', component: NotFound, name: '404', },
];

const router = new VueRouter({
    routes
});

export default router;
```
<small>📍`resources/js/router.js`</small>
```diff
import Vue from 'vue';
import App from './Main/App';
+import router from './router';

require('./bootstrap');

const app = new Vue({
    el: '#app',
    render: h => h(App),
+    router,
});

export default app;
```
<small>📍`resources/js/app.js`</small>
```html
<template>
    <div class="crud">
        <transition name="slide-left" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style scoped>
    .slide-left-enter-active, .slide-left-leave-active {
        transition: all 250ms;
    }
    .slide-left-enter, .slide-left-leave-to {
        opacity: 0;
        transform: translateX(-.25rem);
    }
</style>
```
<small>📍`resources/js/Components/CRUD.vue`</small>

## AJAX and Axios

1. To make AJAX call we need the URL of every HTTP request to submit the form. We will be using a package called `Ziggy` to use the `route()` function inside our javascript:
```bash
composer require tightenco/ziggy
```
```diff
<body>

    <div id="app"></div>

+    @routes
    <script src="{{ mix('js/app.js') }}"></script>
</body>
```
<small>📍`resources/views/index.blade.php`</small>

2. let's create all the crud components files in new `Items` directory:
```html
<template>
    <div class="crud-listing">
        <div class="crud-header">
            <button
                class="button success"
                @click="$router.push({ name: 'items.create' })"
                :disabled="fetching"
            >
                Create
            </button>
            <button
                class="button ml-1"
                title="Reload"
                :disabled="fetching"
                @click="reload()"
            >
                <Fa :icon="['fas', 'sync-alt']" />
            </button>
        </div>
        <Loading v-if="loading" />
        <div v-else class="crud-content mb-0">
            <table class="table" :class="[ items.length === 0 ? '' : 'mb-5']">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="items.length === 0">
                        <td colspan="3" class="text-center"><em>The table is empty.</em></td>
                    </tr>
                    <template v-else>
                        <ItemRow v-for="item in items" :key="item.id" :item="item" />
                    </template>
                </tbody>
            </table>
            <p class="text-right text-sm text-grey-dark" v-if="items.length !== 0">Number of rows: {{ items.length }}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ItemRow from '../ItemRow';
    import form from '../../form';

    export default {
        data() {
            return {
                items: [],
                loading: true,
                fetching: true,
            }
        },
        mounted() {
            let self = this;
            axios.get(route('items.index'))
            .then(res => {
                self.items = res.data.items;
            })
            .catch(err => {

            })
            .then(() => {
                self.fetching = false;
                self.loading = false;
            });
        },
        methods: {
            reload() {
                let self = this;
                this.fetching = true;
                this.loading = true;
                axios.get(route('items.index'))
                .then(res => {
                    self.items = res.data.items;
                })
                .catch(err => {

                })
                .then(() => {
                    self.loading = false;
                    self.fetching = false;
                });
            }
        },
        components: { ItemRow },
    }
</script>
```
<small>📍`resources/js/Components/Items/Index.vue`</small>
```html
<template>
    <div class="crud-create">
        <div class="crud-header">
            <button
                class="button"
                @click="$router.push({ name: 'items.index' })"
                :disabled="fetching"
            >
                <Fa :icon="[ 'fas', 'arrow-left' ]" /> &nbsp;Go back
            </button>
        </div>
        <form @submit.prevent="create()">
            <div class="crud-content">
                <div class="input">
                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full md:w-1/3 px-2">
                            <label for="create_title" class="mt-2">Title</label>
                        </div>
                        <div class="w-full md:w-2/3 px-2">
                            <input type="text" id="create_title" v-model="form.title" @focus="errors.title = []">
                            <span v-if="errors.title" v-text="errors.title[0]" class="input-error"></span>
                        </div>
                    </div>
                </div>
                <div class="input">
                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full md:w-1/3 px-2">
                            <label for="create_comment" class="mt-2">Comment</label>
                        </div>
                        <div class="w-full md:w-2/3 px-2">
                            <textarea id="create_comment" v-model="form.comment" cols="30" rows="10" @focus="errors.comment = []"></textarea>
                            <div class="flex flex-wrap">
                                <div class="w-1/2">
                                    <span v-if="errors.comment" v-text="errors.comment[0]" class="input-error"></span>
                                </div>
                                <div class="w-1/2">
                                    <span class="input-help">Maximum of 1000 letters.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="crud-footer">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full md:w-1/3 px-2"></div>
                    <div class="w-full md:w-2/3 px-2">
                        <button
                            type="submit"
                            class="button loading"
                            :class="fetching ? 'loading-show' : ''"
                            :disabled="fetching"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import form from '../../form';

    export default {
        data() {
            return {
                fetching: false,
                form: {
                    title: '',
                    comment: '',
                },
                errors: {},
            }
        },
        methods: {
            create() {
                let self = this;
                self.fetching = true;
                axios.post(route('items.store'),{
                    title: self.form.title,
                    comment: self.form.comment,
                })
                .then(res => {
                    self.clear();
                    form.note('Create request succeeded.', 8000);
                    self.errors = {};
                    self.$router.push({ name: 'items.index' });
                })
                .catch(err => {
                    self.errors = form.errors(err);
                })
                .then(() => {
                    self.fetching = false;
                });
            },
            clear() {
                this.form.title = '';
                this.form.comment = '';
            }
        }
    }
</script>
```
<small>📍`resources/js/Components/Items/Create.vue`</small>
```html
<template>
    <div class="crud-show">
        <div class="crud-header">
            <button
                class="button"
                @click="$router.push({ name: 'items.index' })"
                :disabled="fetching"
            >
                <Fa :icon="[ 'fas', 'arrow-left' ]" /> &nbsp;Go back
            </button>
        </div>
        <Loading v-if="loading" />
        <template v-else>
            <div class="crud-content">
                <h2 class="mb-4" v-text="item.title"></h2>
                <p class="text-content" v-text="item.comment"></p>
            </div>
            <div class="crud-meta">
                <p class="mb-1">Written at: {{ item.created_at }} ({{ item.written_at }}).</p>
                <p v-if="item.created_date != item.updated_date">Last updated: {{ item.updated_at }} ({{ item.modified_at }}).</p>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                loading: true,
                fetching: true,
                item: {},
            }
        },
        mounted() {
            let self = this;
            axios.get(route('items.show', { item: self.$route.params.id }))
            .then(res => {
                self.modify(res.data.item);
            })
            .catch(err => {

            })
            .then(() => {
                self.fetching = false;
                self.loading = false;
            });
        },
        methods: {
            modify(item) {
                this.item = item;
            }
        }
    }
</script>
```
<small>📍`resources/js/Components/Items/Show.vue`</small>
```html
<template>
    <div class="crud-edit">
        <div class="crud-header">
            <button
                class="button"
                @click="$router.push({ name: 'items.index' })"
                :disabled="fetching"
            >
                <Fa :icon="[ 'fas', 'arrow-left' ]" /> &nbsp;Go back
            </button>
        </div>
        <Loading v-if="loading" />
        <template v-else>
            <form @submit.prevent="edit()">
                <div class="crud-content">
                    <div class="input">
                        <div class="flex flex-wrap -mx-2">
                            <div class="w-full md:w-1/3 px-2">
                                <label for="edit_title" class="mt-2">Title</label>
                            </div>
                            <div class="w-full md:w-2/3 px-2">
                                <input type="text" v-model="form.title" id="edit_title" @focus="errors.title = []">
                                <span v-if="errors.title" v-text="errors.title[0]" class="input-error"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input">
                        <div class="flex flex-wrap -mx-2">
                            <div class="w-full md:w-1/3 px-2">
                                <label for="edit_comment" class="mt-2">Comment</label>
                            </div>
                            <div class="w-full md:w-2/3 px-2">
                                <textarea id="edit_comment" v-model="form.comment" cols="30" rows="10" @focus="errors.comment = []"></textarea>
                                <div class="flex flex-wrap">
                                    <div class="w-1/2">
                                        <span v-if="errors.comment" v-text="errors.comment[0]" class="input-error"></span>
                                    </div>
                                    <div class="w-1/2">
                                        <span class="input-help">Maximum of 1000 letters.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="crud-footer">
                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full md:w-1/3 px-2"></div>
                        <div class="w-full md:w-2/3 px-2">
                            <button
                                type="submit"
                                class="button loading"
                                :class="fetching ? 'loading-show' : ''"
                                :disabled="fetching"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import form from '../../form';

    export default {
        data() {
            return {
                loading: true,
                fetching: true,
                form: {
                    title: '',
                    comment: '',
                },
                errors: {},
            }
        },
        mounted() {
            let self = this;
            axios.get(route('items.show', { item: self.$route.params.id }))
            .then(res => {
                self.modify(res.data.item);
            })
            .catch(err => {

            })
            .then(() => {
                self.fetching = false;
                self.loading = false;
            });
        },
        methods: {
            edit() {
                let self = this;
                self.fetching = true;
                axios.patch(route('items.update', { item: self.$route.params.id }),{
                    title: self.form.title,
                    comment: self.form.comment,
                })
                .then(res => {
                    form.note('Edit request succeeded.', 8000);
                    self.errors = {};
                    self.$router.push({ name: 'items.index' });
                })
                .catch(err => {
                    self.errors = form.errors(err);
                })
                .then(() => {
                    self.fetching = false;
                });
            },
            modify(item) {
                this.form.title = item.title;
                this.form.comment = item.comment;
            },
        }
    }
</script>
```
<small>📍`resources/js/Components/Items/Edit.vue`</small>
```html
<template>
    <div class="crud-edit">
        <div class="crud-header">
            <button
                class="button"
                @click="$router.push({ name: 'items.index' })"
                :disabled="fetching"
            >
                <Fa :icon="[ 'fas', 'arrow-left' ]" /> &nbsp;Go back
            </button>
        </div>
        <div class="crud-content text-center">
            <img src="images/thinking-emoji.png" class="mb-5" alt="Thinking emoji" />
            <h2>Pretty sure you want to delete this?</h2>
        </div>
        <div class="crud-footer text-center">
            <form @submit.prevent="remove()">
                <button
                    type="submit"
                    class="button danger loading"
                    :class="fetching ? 'loading-show' : ''"
                    :disabled="fetching"
                >
                    Delete
                </button>
                <button
                    type="button"
                    class="button ml-1"
                    @click="$router.push({ name: 'items.index' })"
                    :disabled="fetching"
                >
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import form from '../../form';

    export default {
        data() {
            return {
                fetching: false,
            }
        },
        methods: {
            remove() {
                let self = this;
                self.fetching = true;
                axios.delete(route('items.destroy', { item: self.$route.params.id }))
                .then(res => {
                    form.note('Delete request succeeded.', 8000);
                    self.$router.push({ name: 'items.index' });
                })
                .catch(err => {

                })
                .then(() => {
                    self.fetching = false;
                });
            },
        }
    }
</script>
```
<small>📍`resources/js/Components/Items/Delete.vue`</small>  
`🔥 Pro Tip:` I need to mention that you should be careful about redirecting after the creation and the edition requests in case user need to do that multiple times. It's so annoying for the user to go back over and over to submit the form again but it's not an issue in our case. Thanks to [@DesTheDev](https://github.com/DesTheDev) suggestion in this part - [#1](https://github.com/the94air/laravel-ajax-crud/issues/1).

3. To show the correct date, we need to configure the date fields inside of our `Items` model:
```php
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Item extends Model
{
    protected $fillable = [
        'title', 'comment',
    ];

    protected $appends = ['written_at', 'modified_at', 'created_date', 'updated_date'];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
    ];

    public function getCreatedDateAttribute()
    {
        return Carbon::parse($this->created_at)->format('Y-m-d H:i:s');
    }

    public function getUpdatedDateAttribute()
    {
        return Carbon::parse($this->updated_at)->format('Y-m-d H:i:s');
    }

    public function getWrittenAtAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function getModifiedAtAttribute()
    {
        return Carbon::parse($this->updated_at)->diffForHumans();
    }
}
```
<small>📍`app/Item.php`</small>

4. You can version your assets when compiling to production using the if statement inside `webpack.mix.js`:
```diff
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .copyDirectory('resources/images', 'public/images')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss('./tailwind.js'),
        ],
    });

+ if (mix.inProduction()) {
+     mix.version();
+ }
```
<small>📍`webpack.mix.js`</small>

5. you'r Done! 
