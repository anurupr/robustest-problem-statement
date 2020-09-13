<template>
    <div class="column">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Column'
}
</script>
<style scoped>
    /* Using bootstrap principles */
    .column {
        display: flex;
        padding-left: 15px;
        padding-right: 15px;
        flex-basis: 0;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
        float: left;
    }

    .column__xs {
        max-width: 540px;
    }

    .column__sm {
        max-width: 720px;        
    }

    .column__lg {
        max-width: 960px;
    }

    .column__xl {
        max-width: 1140px;
    }

    .column__ct_1 {
        width: 8.333333%;
    }

    .column__ct_2 {
        width: 16.666667%;
    }

    .column__ct_3 {
        width: 25%;
    }

    .column__ct_4 {
        width: 33.3%;
    }

    .column__ct_5 {
        width: 41.666667%;
    }

    .column__ct_6 {
        width: 50%;
    }

    .column__ct_7 {
        width: 58.333333%;
    }

    .column__ct_8 {
        width: 66.666667%;
    }

    .column__ct_9 {
        width: 75%;
    }

    .column__ct_10 {
        width: 83.333333%;
    }

    .column__ct_11 {
        width: 91.666667%;
    }
    
    .column__ct_12 {
        width: 100%;
    }

    /* Responsive classes */
    @media screen and (min-width: 576px) and (max-width: 768px){
        .column__sm__ct_1 {
            width: 8.333333%;
        }

        .column__sm__ct_2 {
            width: 16.666667%;
        }

        .column__sm__ct_3 {
            width: 25%;
        }

        .column__sm__ct_4 {
            width: 33.3%;
        }

        .column__sm__ct_5 {
            width: 41.666667%;
        }

        .column__sm__ct_6 {
            width: 50%;
        }

        .column__sm__ct_7 {
            width: 58.333333%;
        }

        .column__sm__ct_8 {
            width: 66.666667%;
        }

        .column__sm__ct_9 {
            width: 75%;
        }

        .column__sm__ct_10 {
            width: 83.333333%;
        }

        .column__sm__ct_11 {
            width: 91.666667%;
        }

        .column__sm__ct_12 {
            width: 100%;
        }
    }

    @media screen and (max-width: 576px) {
        .column { padding: 0 1rem; }
        .column__xs__ct_1 {
            width: 8.333333%;
        }

        .column__xs__ct_2 {
            width: 16.666667%;
        }

        .column__xs__ct_3 {
            width: 25%;
        }

        .column__xs__ct_4 {
            width: 33.3%;
        }

        .column__xs__ct_5 {
            width: 41.666667%;
        }

        .column__xs__ct_6 {
            width: 50%;
        }

        .column__xs__ct_7 {
            width: 58.333333%;
        }

        .column__xs__ct_8 {
            width: 66.666667%;
        }

        .column__xs__ct_9 {
            width: 75%;
        }

        .column__xs__ct_10 {
            width: 83.333333%;
        }

        .column__xs__ct_11 {
            width: 91.666667%;
        }

        .column__xs__ct_12 {
            width: 100%;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 992px) {
        .column__md__ct_1 {
            width: 8.333333%;
        }

        .column__md__ct_2 {
            width: 16.666667%;
        }

        .column__md__ct_3 {
            width: 25%;
        }

        .column__md__ct_4 {
            width: 33.3%;
        }

        .column__md__ct_5 {
            width: 41.666667%;
        }

        .column__md__ct_6 {
            width: 50%;
        }

        .column__md__ct_7 {
            width: 58.333333%;
        }

        .column__md__ct_8 {
            width: 66.666667%;
        }

        .column__md__ct_9 {
            width: 75%;
        }

        .column__md__ct_10 {
            width: 83.333333%;
        }

        .column__md__ct_11 {
            width: 91.666667%;
        }

        .column__md__ct_12 {
            width: 100%;
        }
    }

    @media screen and (min-width: 992px) and (max-width: 1200px) {
        .column__lg__ct_1 {
            width: 8.333333%;
        }

        .column__lg__ct_2 {
            width: 16.666667%;
        }

        .column__lg__ct_3 {
            width: 25%;
        }

        .column__lg__ct_4 {
            width: 33.3%;
        }

        .column__lg__ct_5 {
            width: 41.666667%;
        }

        .column__lg__ct_6 {
            width: 50%;
        }

        .column__lg__ct_7 {
            width: 58.333333%;
        }

        .column__lg__ct_8 {
            width: 66.666667%;
        }

        .column__lg__ct_9 {
            width: 75%;
        }

        .column__lg__ct_10 {
            width: 83.333333%;
        }

        .column__lg__ct_11 {
            width: 91.666667%;
        }

        .column__lg__ct_12 {
            width: 100%;
        }            
    }

    @media screen and (min-width: 1200px) {
        .column__xl__ct_1 {
            width: 8.333333%;
        }

        .column__xl__ct_2 {
            width: 16.666667%;
        }

        .column__xl__ct_3 {
            width: 25%;
        }

        .column__xl__ct_4 {
            width: 33.3%;
        }

        .column__xl__ct_5 {
            width: 41.666667%;
        }

        .column__xl__ct_6 {
            width: 50%;
        }

        .column__xl__ct_7 {
            width: 58.333333%;
        }

        .column__xl__ct_8 {
            width: 66.666667%;
        }

        .column__xl__ct_9 {
            width: 75%;
        }

        .column__xl__ct_10 {
            width: 83.333333%;
        }

        .column__xl__ct_11 {
            width: 91.666667%;
        }

        .column__xl__ct_12 {
            width: 100%;
        }
    }    
</style>