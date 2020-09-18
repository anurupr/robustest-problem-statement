<template>
    <ul class="menu floating">
        <li class="menuitem">
            <!-- @click.self ensures that handler is called when clicking on this element only -->
            <span
            class="dot"            
            @click.self="toggleDropdown"
            >
                <div :class="{ isOpen }" class="dropdown">
                    <ul>
                        <li >
                          <!-- @click.native is required to handle on click of router link -->
                          <router-link :to='{ name: "edit-comment", params: { postId, id: commentId } }' class="edit" @click.native="toggleDropdown">
                               <font-awesome-icon icon="edit" />Edit
                         </router-link>
                        </li>
                        <li>
                          <router-link :to='{ name: "delete-comment", params: { postId, id: commentId  } }' class="delete" @click.native="toggleDropdown">
                               <font-awesome-icon icon="trash" />Delete
                         </router-link>
                        </li>
                    </ul>
                </div>
            </span>
        </li>
    </ul>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    },
    components: {
       FontAwesomeIcon
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleDropdown() {            
            this.isOpen = !this.isOpen
        }
    }
    
}
</script>
<style scoped>
 ul.menu.floating {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }
    .menuitem a > span,
    .dropdown /deep/ a > span {
        display: inline-block;
        text-indent: 5px;
    }
    
    .menuitem > .dot:after {
        content: '\2807';
        font-size: 25px;
        padding-left: 8px;
    } 

    .menuitem > .hamburger:after {
        content: '\2261';
        font-size: 25px;
        padding-left: 8px;
    }

    .dropdown ul {
        text-align: left;
    }

    .dropdown li {
        padding: .25em;
    }

    .dropdown {
        position: absolute;
        left: 50%;
        transform: translatex(-50%) rotatex(90deg) scale(0);
        margin-top: 0.55em;
        transform-origin: 0 0;
        border-radius: 0.35em;
        background-color: #f5f5f5;
        visibility: hidden;
        opacity: 0;
        transition: all 200ms linear;
        z-index: 9999;
        box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2);
        min-width: 5em;
        top: 1em;
    }

    .dropdown.isOpen {
        transform: translatex(-50%);
        visibility: visible;
        opacity: 1;
    }
</style>
