<template>
    <nav class="navbar navbar-fixed">
        <div class="container">
            <div class="navbar-main">
                <div class="navbar-brand">
                    <router-link :to="{ name: 'items.index' }">
                        <p>Laravel AJAX CRUD</p>
                    </router-link>
                </div>
                <ul class="navbar-menu">
                    <li>
                        <a target="_blank" class="button github" href="https://github.com/the94air/laravel-ajax-crud">
                            <Fa :icon="['fab', 'github']" /> <span class="text-md">Fork on GitHub</span>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" class="button github" href="https://github.com/the94air/laravel-ajax-crud">
                            <Fa :icon="['fas', 'star']" /> <span class="text-md">Give us star</span>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" class="button twitter" href="https://twitter.com/intent/tweet?text=A+simple+example+of+using+Laravel+5.8+and+Vue+2+for+creating+CRUD+applications+with+AJAX+functionality.&url=https%3A%2F%2Flaravel-ajax-crud.herokuapp.com&via=abdalla__arbab">
                            <Fa :icon="['fab', 'twitter']" /> <span class="text-md">Tweet it</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
