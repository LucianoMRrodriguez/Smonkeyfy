<template>
    <header class="fixed-top barra nav">
        <slot>
            default
        </slot>
    </header>
</template>

<script>
    export default {
        name: 'smonkeyfy-header'
    }
</script>

<style>
.barra{
    background: url(http://3.bp.blogspot.com/-OeETqj1J24g/UPXmNPWFkFI/AAAAAAAADVQ/2f1br_27_bw/s1600/Twitter-Header-Purple01.jpg);
    height: 60px;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
