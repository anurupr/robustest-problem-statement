<template>
    <transition name="slide-fade" appear>
        <div class="popup message" :class="type">
            {{ message }}
        </div>
    </transition>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'Popup',
        props: {
            message: {
                type: String,
                required: true,
            },
            // success, error, warning
            type: {
                type: String,
                required: true,
            },
            // time to display in milliseconds
            timeout: {
                type: Number,
                default: 1000
            },
            id: {
                type: Number,
                required: true
            }
        },
        methods: {
            ...mapActions([
                'removeNotif'
            ])
        },
        created(){
            // start timeout
            const self = this
            setTimeout(function() {
                self.removeNotif(self.id)
            }, self.timeout)
        }
    };
</script>
<style scoped>
    .popup {
        position: relative;
        min-height: 50px;
        min-width: 200px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        position: relative;
        max-height: 800px;
        min-height: 64px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 1rem;
        padding: 22px 24px;
        border-radius: 8px;
        -webkit-box-shadow: 0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);
        box-shadow: 0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        font-family: Lato,Helvetica,Roboto,Arial,sans-serif;
        max-width: 600px;
        min-width: 326px;
        pointer-events: auto;
        overflow: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        direction: ltr;        
        color: #fff;
        z-index: 999999;
    }

    .success {
        background-color: steelblue;
    }

    .error {
        background-color: #c66;
    }

    .warn {
        background-color: orange;
    }

    .slide-leave-active,
    .slide-enter-active {
        transition: 2s;
    }

    .slide-enter {
        transform: translate(-100%, 0);
    }

    .slide-leave-to {
        transform: translate(100%, 0);
    }

    .slide-fade-enter-active {
    transition: all .3s ease;
    }
    .slide-fade-leave-active {
    transition: all .7s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(50px);
    opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        -webkit-transition: opacity 0.1s ease-out;
        -o-transition: opacity 0.1s ease-out;
        transition: opacity 0.1s ease-out; 
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0; 
    }
</style>