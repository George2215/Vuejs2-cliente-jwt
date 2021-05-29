<template>
    <v-alert
        v-if="validationErrors.length > 0"
        color="error"
        dark
    >
        <p v-for="error in validationErrors" :key="error">
            {{ error }}
        </p>
    </v-alert>
</template>

<script>
export default {
    name: 'ErrorFormMessages',
    props: {
        validationErrors: Array
    }
}
</script>