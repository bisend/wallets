<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm9 md9 lg6>
            <h1>Create new wallet</h1>
            <v-form>
                <v-text-field
                    label="Name"
                    required
                ></v-text-field>
                <v-select
                    :items="['USD', 'RUB', 'UAH']"
                    label="Currency"
                ></v-select>
                <v-btn @click="submit">Create</v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    methods: {
        submit() {
            // this.$axios.$get('http://icanhazip.com')
            // .then((response) => {
                // console.log(response)
            // })
        }
    }
}
</script>

