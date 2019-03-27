<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(4, true),
        'comment' => $faker->realText(200, 2),
    ];
});
