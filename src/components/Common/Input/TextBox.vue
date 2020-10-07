<template>
    <v-card elevation="0" class="mx-1 my-0">
        <v-row no-gutters>
            <v-col cols="2" lg="1" class="pt-4">                
                <v-avatar>
                    <v-img :src="gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="10" lg="11" class="d-flex flex-row pt-0">
                <!-- Remove padding when in mobile mode --- gives more space for elements -->
                <v-col cols="10" lg="11" :class="{'pl-2': $vuetify.breakpoint.mobile }">
                    <!-- recommended method of using v-model with custom components -->
                    <!-- when we declare the component we use <component v-model="varname" /> -->
                    <!-- internally this is how it is handled -->
                    <!-- refer to https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components -->
                    <v-textarea dense  rows="1" no-resize v-bind:value="value" :placeholder="pholder" v-on:input="$emit('input', $event)" ></v-textarea>
                </v-col>
                <v-col cols="2" sm="1" class="pt-1">
                    <v-card-actions class="pa-0 d-flex justify-center">
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