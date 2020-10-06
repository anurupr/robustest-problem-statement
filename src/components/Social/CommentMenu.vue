<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text          
          v-bind="attrs"
          v-on="on"
          fab
        >
          <v-icon>fa-ellipsis-v</v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- v-list-item extends router link properties , so it can use the same attributes -->
        <v-list-item :key="'edit-comment' + commentId" link :to='{ name: "edit-comment", params: { postId, id: commentId } }'>            
            <v-list-item-icon>
              <v-icon >fa-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit</v-list-item-title>            
        </v-list-item>
        <v-list-item :key="'delete-comment' + commentId" link :to='{ name: "delete-comment", params: { postId, id: commentId  } }'>
            <v-list-item-icon>
              <v-icon>fa-trash</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faEdit, faTrash)
export default {
    name: 'CommentMenu',
    props: {
        postId: {
            type: Number,
            required: true
        },
        commentId: {
            type: Number,
            required: true
        }
    }
}
</script>