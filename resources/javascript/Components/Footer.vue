<template>
    <footer>
        <div class="footer">
            <div class="container">
                <hr>
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2">
                        <p class="copy">&copy; Codolog {{ date }}</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <p>Made by <a href="https://github.com/the94air">@the94air</a>. All the code is <a href="https://github.com/the94air/Laravel-ajax/blob/master/LICENSE">MIT</a> licensed.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        computed: {
            date() {
                return new Date().getFullYear();
            }
        }
    }
</script>
