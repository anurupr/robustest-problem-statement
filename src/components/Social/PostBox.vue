<template>
    <v-card class="pa-2">
        <text-box :pholder="pholder" v-model="content" class="post__box">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        color="primary"
                        raised
                        elevation="1"
                        fab
                        v-bind="attrs"
                        v-on="on"
                        v-on:click="add"
                        :disabled="!valid"
                        :loading="loading"
                        >
                        <v-icon>
                            fa-paper-plane
                        </v-icon>
                    </v-btn>
                </template>
                <span>Post</span>
            </v-tooltip>
        </text-box>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getutime } from '@/utils';
export default {
    name: 'PostBox',
    methods: {
        ...mapActions({
            addPost: 'addPost',
            errorNotif: 'addErrorNotif'
        }),
        add: async function() {
            if (this.valid) {
                var post = {
                    content: this.content,
                    user : this.getCurrentUser,
                    timestamp: getutime(),
                    comments: []      
                }
                this.loading = true
                await this.addPost(post)
                this.loading = false

                if (this.$route.path !== '/')
                    this.$router.push('/')
            } else {
                this.errorNotif({ message: 'Post cannot be empty'})
            }
        }
    },
    data()  {
        return {             
            pholder: "What's going on?",
            content: "",
            loading: false
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ]),
        valid() {
            return this.content != null && this.content.length > 0
        }
    }
}
</script>