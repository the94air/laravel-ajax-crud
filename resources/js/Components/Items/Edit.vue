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
