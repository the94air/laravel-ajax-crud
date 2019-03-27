<template>
    <div class="crud">
        <transition name="slide-left" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style scoped>
    .slide-left-enter-active, .slide-left-leave-active {
        transition: all 250ms;
    }
    .slide-left-enter, .slide-left-leave-to {
        opacity: 0;
        transform: translateX(-.25rem);
    }
</style>
