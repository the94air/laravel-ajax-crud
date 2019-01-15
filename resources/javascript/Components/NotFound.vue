<template>
    <div class="not-found">
        <img class="mb-5" src="images/shrug-gumball.png" alt="Shrug gumball" title="404">
        <h2 class="mb-5">Meh, I couldn't find what you're looking for!</h2>
        <button class="button" @click="$router.push({ name: 'items.index' })">Go back</button>
    </div>
</template>
