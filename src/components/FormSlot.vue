<template>
<v-card>
    <v-toolbar color="primary" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <form-wrapper :validator="vuelidate.form">
        <form-summary />
        <v-container>
            <slot></slot>
        </v-container>
    </form-wrapper>
</v-card>
</template>

<script>
export default {
    name: 'FormSlot',
    props: {
        title: String,
        vuelidate: Object
    }
}
</script>