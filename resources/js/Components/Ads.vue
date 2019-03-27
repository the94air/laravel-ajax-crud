<template>
    <aside class="star">
        <div class="container">
            <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                    <h2 class="mb-8">Other projects</h2>
                </div>
                <div class="w-full md:w-1/2 px-3" v-for="ad in ads" :key="ad.id">
                    <a target="_blank" :href="ad.link">
                        <div class="star-card">
                            <div class="star-card-img">
                                <img :src="ad.image_path" :alt="ad.title" :title="ad.title">
                            </div>
                            <div class="star-card-text">
                                <h3>{{ ad.title }}</h3>
                                <p class="star-card-sub">{{ ad.sub_title }}</p>
                                <p>{{ ad.description }}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        data() {
            return {
                ads: [
                    {
                        id: 1,
                        title: 'Form',
                        link: 'https://form.js.org',
                        image_path: 'images/form.png',
                        sub_title: 'A Classic Form Styling With Ease.',
                        description: 'Single Class CSS Framework For Web Forms.',
                    },
                    {
                        id: 2,
                        title: 'Codolog',
                        link: 'https://codolog.com',
                        image_path: 'images/codolog.png',
                        sub_title: 'Your notes, simplified.',
                        description: 'A cloud-based app for saving notes, thoughts, and ideas. Build especially for developers.',
                    }
                ]
            }
        }
    }
</script>