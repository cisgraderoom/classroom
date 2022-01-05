<template>
    <div>
        <v-row align="top">
            <v-col cols="2" sm="1" md="1" lg="1" xl="1">
                <v-icon
                    large
                    v-show="role != 'superteacher' && role != 'teacher'"
                    >mdi-account-circle</v-icon
                >
                <v-icon
                    color="deep-orange darken-1"
                    large
                    v-show="role == 'superteacher' || role == 'teacher'"
                    >mdi-account-circle</v-icon
                >
            </v-col>
            <v-col cols="8" xs="10" sm="10" md="10">
                <h5>{{ who }}</h5>
                <h6>{{ created_at }}</h6>
                <p>
                    {{ commenttext }}
                </p>
                <!-- <p>postID : {{ post_id }}</p> -->
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <DeleteComment
                    :comment_id="comment_id"
                    :post_id="post_id"
                    :classcode="classcode"
                    v-show="user == who"
                    @getComment="getListComment"
                />
                <!-- <v-btn icon><v-icon>mdi-delete</v-icon></v-btn> -->
            </v-col>
        </v-row>
    </div>
</template>

<script>
import DeleteComment from './DeleteComment'
export default {
    name: 'Comment',
    props: [
        'comment_id',
        'post_id',
        'classcode',
        'commenttext',
        'who',
        'created_at',
        'role',
    ],
    components: {
        DeleteComment,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user'))?.name,
        }
    },
    methods: {
        getListComment() {
            this.$emit('getComment')
        },
    },
}
</script>

<style></style>
