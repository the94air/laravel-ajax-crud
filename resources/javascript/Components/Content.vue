<template>
    <div class="content">
        <div class="container">
            <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/3 px-3">
                    <div class="page-card">
                        <h1 class="mb-6">Laravel AJAX CRUD Application</h1>
                        <p class="leading-normal text-xl">This is a simple example of using Laravel 5.7 and Vue 2 for creating CRUD applications with AJAX functionality. It's hosted on heroku.com. Please give us a star on GitHub if you like what you see. Feel free to fork the repository and play around with the code. Have fun!</p>
                    </div>
                </div>
                <div class="w-full md:w-2/3 px-3">
                    <div class="page-card">
                        <CRUD />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CRUD from '../Components/CRUD';

    export default {
        components: { CRUD },
    }
</script>
