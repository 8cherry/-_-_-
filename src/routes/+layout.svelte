<script lang="ts">
    import '../app.css';

    let {children, auth} = $props();

</script>


{@render children()}

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1 1 auto;
    }
</style>
