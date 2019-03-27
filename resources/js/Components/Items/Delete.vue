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
