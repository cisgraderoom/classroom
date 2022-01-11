<template>
    <v-menu offset-y transition="scroll-y-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-col cols="1" sm="1" md="1">
                <v-btn icon v-bind="attrs" v-on="on"
                    ><v-icon>mdi-dots-vertical</v-icon></v-btn
                >
            </v-col>
        </template>
        <v-list>
            <v-list-item link>
                <v-list-item-title
                    ><EditPost
                        :post_id="postid"
                        :post_text="posttext"
                        :class_code="classcode"
                        @getPost="getListPost"
                /></v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-title
                    ><DeletePost
                        :post_id="postid"
                        :class_code="classcode"
                        @getPost="getListPost"
                /></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import EditPost from './EditPost.vue'
import DeletePost from './DeletePost.vue'
export default {
    name: 'Post',
    props: ['postid', 'posttext', 'classcode'],
    components: {
        EditPost,
        DeletePost,
    },
    methods: {
        getListPost() {
            this.$emit('getPost')
        },
    },
}
</script>

<style></style>
