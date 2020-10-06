<template>
    <modal v-model="show" title="Login to your account">
        <v-card>
            <v-form ref="form" v-model="valid" class="login" lazy-validation action="/login" method="POST" @submit.prevent="submit" >            
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="username"
                            :rules="usernameRules"                    
                            label="Username"
                            required                        
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"                        
                            label="Password"
                            required                        
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-btn color="primary" type="submit">Login</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            valid: false,
            username: "",
            password: "",
            show: false,
            usernameRules: [
                v => !!v || 'Username is required'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 4 || 'Password must be greater than 4 characters'
            ]
        }
    },
    methods: {
        ...mapActions([
            'loginRequest',
            'modalVisible',
            'addNotif'
        ]),
        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    await this.loginRequest({ username: this.username, password: this.password })
                    if (this.$route.path !== '/')
                        this.$router.push('/');
                } catch(msg) {
                    console.error('error', msg);
                    addNotif({ type: 'error', message: 'Error! Please try again'})
                }
            } else {
                addNotif({ type: 'error', message: 'Error! Please try again'})
            }
        },
        showModal() {
            this.show = true
            this.modalVisible(this.show)
        },
        hideModal() {
            this.show = false
            this.modalVisible(this.show)
        },
    },
    mounted(){
        this.showModal()
    },
    beforeRouteLeave (to, from, next) {
      this.hideModal()
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.
      next()
    }
}
</script>
<style scoped>
    form.login {
        padding: 2rem;
        min-height: 30rem;
        max-width: 30rem;
        margin: 0 auto;
        border-radius: 5px;
    }
</style>