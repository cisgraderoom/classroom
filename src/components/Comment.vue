<template>
    <div>
        <v-row>
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
                <h5
                    style="word-break: break-word"
                    v-show="role != 'superteacher' && role != 'teacher'"
                >
                    {{ who }}
                </h5>
                <h5
                    class="deep-orange--text text--darken-1"
                    style="word-break: break-word"
                    v-show="role == 'superteacher' || role == 'teacher'"
                >
                    {{ who }}
                </h5>
                <h6
                    class="grey--text text--darken-1"
                    style="word-break: break-word"
                >
                    {{ dateFormat }}
                </h6>
                <p style="word-break: break-word">
                    {{ commenttext }}
                </p>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <DeleteComment
                    :comment_id="comment_id"
                    :post_id="post_id"
                    :classcode="classcode"
                    v-show="user == username"
                    @getComment="getListComment"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import DeleteComment from './DeleteComment'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

export default {
    name: 'Comment',
    props: [
        'comment_id',
        'post_id',
        'classcode',
        'commenttext',
        'who',
        'username',
        'created_at',
        'role',
    ],
    components: {
        DeleteComment,
    },
    mounted() {
        this.formatDate()
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user'))?.username,
            dateFormat: null,
        }
    },
    methods: {
        getListComment() {
            this.$emit('getComment')
        },
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.dateFormat = timeAgo.format(new Date(this.created_at))
        },
    },
}
</script>

<style></style>
