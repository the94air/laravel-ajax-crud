<template>
    <tr>
        <td v-text="item.id"></td>
        <td class="title">
            <div class="flex justify-between items-center">
                <span class="text-grey-darkest">{{ item.title }}</span>
                <span class="text-xs text-right">{{ date }}</span>
            </div>
        </td>
        <td class="w-48 text-center">
            <button class="button info" @click="$router.push({ name: 'items.show', params: { id: item.id } })">Show</button>
            <button class="button warning ml-1" @click="$router.push({ name: 'items.edit', params: { id: item.id } })">Edit</button>
            <button class="button danger ml-1" @click="$router.push({ name: 'items.delete', params: { id: item.id } })">Delete</button>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    computed: {
        date() {
            return this.item.created_date == this.item.updated_date ? 'Added ' + this.item.written_at : 'Edited ' + this.item.modified_at;
        }
    }
}
</script>

<style scoped>
    .title {
        padding-right: 0 !important;
    }
</style>
