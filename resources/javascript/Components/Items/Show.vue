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
