<template>
    <div>
        <Navbar />
        <Content />
        <Ads />
        <Footer />
        <Notifications />
    </div>
</template>

<script>
    import Navbar from '../Components/Navbar';
    import Content from '../Components/Content';
    import Ads from '../Components/Ads';
    import Footer from '../Components/Footer';
    import Notifications from '../Components/Notifications';

    export default {
        components: { Navbar, Content, Ads, Footer, Notifications, },
    }
</script>
