<template>
    <div class="box text__box">
        <row>
            <column class="column__ct_1 column__xs__ct_2 avatar">
                <img :src="gravatar" >
            </column>
            <column class="column__ct_10 column__xs__ct_10">
                <column class="column__ct_10 column__xs__ct_9 textbox__container">
                    <!-- recommended method of using v-model with custom components -->
                    <!-- when we declare the component we use <component v-model="varname" /> -->
                    <!-- internally this is how it is handled -->
                    <!-- refer to https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components -->
                    <textarea v-bind:value="value" :placeholder="pholder" v-on:input="$emit('input', $event.target.value)" ></textarea>
                </column>
                <column class="column__ct_2 column__xs__ct_3 submit__container">
                    <slot></slot>
                </column>
            </column>
        </row>
    </div>
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
        font-size: 1.5rem;
        padding: .5rem;
        /* height: auto; */
        background: white;
        /* max-height: 45px;   */
    }


    .text__box .textbox__container {
        padding: 0 1rem;
        flex-grow: 9;
    }


    .text__box .submit__container {
        padding: 0px;
    }

    .text__box textarea,
    .text__box .submit {
        float: left;
    }
</style>
