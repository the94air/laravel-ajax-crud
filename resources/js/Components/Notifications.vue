<template>
    <notifications group="notes" position="bottom right" width="320">
        <template slot="body" slot-scope="props">
            <div class="notification">
                <div v-html="props.item.text"></div>
                <a class="close" @click="props.close">
                    <Fa :icon="['fas', 'times']"></Fa>
                </a>
            </div>
        </template>
    </notifications>
</template>
