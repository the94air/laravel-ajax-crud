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
