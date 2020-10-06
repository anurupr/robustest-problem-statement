<template>
    <v-card elevation="0" class="text__box">
        <v-row>
            <v-col cols="2"
                lg="1"
                md="1">
                <v-avatar>
                    <v-img :src="gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="9" sm="9" md="11" lg="11" class="d-flex flex-row">
                <!-- Remove padding when in mobile mode --- gives more space for elements -->
                <v-col cols="9" lg="11"  class="textbox__container" :class="{'pa-0': $vuetify.breakpoint.mobile }">
                    <!-- recommended method of using v-model with custom components -->
                    <!-- when we declare the component we use <component v-model="varname" /> -->
                    <!-- internally this is how it is handled -->
                    <!-- refer to https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components -->
                    <textarea v-bind:value="value" :placeholder="pholder" v-on:input="$emit('input', $event.target.value)" ></textarea>
                </v-col>
                <v-col cols="2" sm="1" class="submit__container">
                    <v-card-actions class="pa-0">
                        <slot></slot>
                    </v-card-actions>
                </v-col>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Box',
    props: {
        pholder: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ]),
        gravatar(){
            return this.user.gravatar
        },
        user() {
            return this.getCurrentUser
        }
    },
    data()  {
        return {
            content: ""
        }
    }
}
</script>
<style scoped>
    .avatar img {
        border-radius: 150px;
        border: 1px solid #aaa;
        /* box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2); */
        width: 45px;
        height: 45px;
    }

    .avatar {
        max-width: 60px;
        padding-right: 0;
        height: 60px;
    }

    .text__box .row,
    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text__box {
        margin: 1rem 0;
    }

    .text__box textarea {
        outline: none;
        border: 1px solid #aaa;
        resize: none;
        width: 100%;
        font-family: 'Segoe UI Historic', 'Segoe UI', Helvetica, Arial, sans-serif;
        /* font-size: 1.5rem; */
        padding: .5rem;
        /* height: auto; */
        background: white;
        max-height: 60px;  
    }


    .text__box .textbox__container {
        padding: 0rem 1rem 0rem 0rem;
        display: flex;
        flex-grow: 11;
        justify-content: center;
        align-items: center;
        
    }


    .text__box .submit__container {
        display: flex;
        padding: 0px;        
    }

    .text__box textarea,
    .text__box .submit {
        float: left;
    }
</style>
