<template>
    <v-layout justify-center align-center row fill-height>
        <v-flex xs12 sm9 md9 lg6>
            <v-card>
                <v-card-title>
                    REGISTER
                </v-card-title>
                <v-card-text>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="email"
                            type="email"
                            label="E-mail"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                            :rules="passwordRules"
                            :counter="20"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="passwordConfirmation"
                            type="password"
                            label="Confirm password"
                            :rules="passwordConfirmationRules"
                            :counter="20"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat @click="submit">
                        SIGN UP
                    </v-btn>
                    <v-btn flat to="/login">
                        LOGIN
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data: function () {
        return {
            valid: true,
            email: '',
            password: '',
            passwordConfirmation: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => /^\S{6,20}$/.test(v) || 'Password length must be from 6 to 20 characters'
            ],
            passwordConfirmationRules: [
                v => !!v || 'Password is required',
                v => v === this.password || 'Passwords do not match'
            ],
        }
    },
    methods: {
        submit: function () {
            if (this.$refs.registerForm.validate()) {
                console.log('valid form')
            } else {
                console.log('not valid form')
            }
        }
    }
}
</script>
