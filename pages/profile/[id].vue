<template>
    id profile : {{   $route.params.id }}
</template>

<script setup>

const router=useRoute()
onUnmounted(()=>{
    console.log(router.params.id)
})


</script>