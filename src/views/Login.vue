<template>
    <modal v-show="showModal">
        <form class="login" action="/login" method="POST" @submit.prevent="submit" >
            <h3>Login to your account</h3>
            <column class="column__ct_12">
                <!-- v-focus is a custom Vue directive to implement the autofocus functionality -->
                <!-- refer to main.js -->
                <input v-focus v-model="username" type="text" name="username" placeholder="Username" required>
            </column>
            <column class="column__ct_12">
                <input v-model="password" type="password" name="password" placeholder="Password" required>
            </column>
            <column class="column__ct_12">
                <input type="submit" value="Login">
            </column>
        </form>
    </modal>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            username: "",
            password: "",
            showModal: false
        }
    },
    methods: {        
        validate() {
            return this.username.length > 0 && this.password.length > 0
        },
        async submit() {
            if (this.validate()) {
                
                try {            
                    let msg = await this.$store.dispatch('loginRequest', { username: this.username, password: this.password })
                    // call popup with msg
                    this.$router.push('/');
                    console.log('msg', msg);
                } catch(msg) {
                    // call popup with msg
                    console.error('error', msg);
                }
            }            
        },
        toggleModal() {
            this.showModal = !this.showModal
        }
    },
    mounted(){        
        this.toggleModal()
    }    
}
</script>
<style scoped>
    form.login {
        background: #fff;
        padding: 2rem;
        min-height: 20rem;
        max-width: 30rem;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0px 0px 9px -3px #000;
    }

    form.login input {
        width: 100%;
    }

    form.login input[type="text"],
    form.login input[type="password"] {
        border: 0;
        border-bottom-color: currentcolor;
        border-bottom-style: none;
        border-bottom-width: 0px;
        border-bottom: 2px solid #ccc;
        line-height: 25px;
        padding: 0 .5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    form.login input[type="submit"] {
        border-radius: 5px;
        background: #33a2ff;
        color: white;
        font-size: 15px;
        line-height: 20px;
        font-weight: bolder;
        cursor: pointer;
        border: 0;
        box-shadow: 0px 0px 15px -10px #000;
        padding: 1rem 2rem; 
        margin-top: 2rem;
    }
</style>