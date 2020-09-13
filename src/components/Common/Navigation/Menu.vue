<!-- Navigation Menu -->
<template>
    <ul class="menu">
        <li class="menu-item clickable" v-if="isLoggedIn" @click="logout">
            <span><font-awesome-icon icon="sign-out-alt" /> Logout</span>
        </li>
        <li class="menu-item" v-if="!isLoggedIn">
            <router-link to="/login">
                <font-awesome-icon icon="sign-in-alt" />
                <span>Login</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignInAlt, faSignOutAlt)
export default {
    name: 'Menu',
    computed: {
        ...mapState({
            isLoggedIn: 'isLoggedIn'
        })
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>
<style scoped>
    .menu.horizontal > li {
        display: inline;
    }

    ul.menu {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
    }

    ul.menu li {
        position: relative;
        margin: 0.25em;
        text-align: center;
    }

    ul.menu li /deep/  a {    
        width: 100%;    
    }

    li.menu-item.clickable > span {
        cursor: pointer;        
    }

    ul.menu li /deep/  a,
    li.menu-item.clickable > span {
       padding: .25rem;
       border-radius: 5px;       
       display: inline-block;
       text-decoration: none;
       transition: all 200ms ease;
       color: #444;
    }

    /* ul.menu li /deep/ a:hover {
        background-color: #eee;
    }
    ul.menu li a.active {
        background-color: rgba(33, 37, 41, 0.45);
    }
    ul.menu li /deep/ ul {
        padding: .25rem;
    }

    ul.menu li ul li a {
        background-color: transparent;
    }

    ul.menu.responsive {
        display: none;
    } */

    ul.menu.floating {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
    }

    li.menu-item a > span {
        display: inline-block;
        text-indent: 5px;
    }

    @media screen and (max-width: 576px) {
        ul.menu.regular {
            display: none;
        }
        ul.menu.responsive {
            display: block;
        }
    }
</style>