<template>
    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
        <v-row class="align-center">
            <v-col cols="2" sm="1" md="1" lg="1" xl="1">
                <v-icon color="deep-orange darken-1" large
                    >mdi-account-circle</v-icon
                >
            </v-col>
            <v-col cols="8" sm="10" md="10">
                <h3 class="deep-orange--text text--darken-1">{{ who }}</h3>
                <h5 class="grey--text text--darken-1">
                    {{ dateFormat }}
                </h5>
            </v-col>
            <menuPost
                :postid="postid"
                :posttext="posttext"
                :classcode="classcode"
                @getPost="getListPost"
                v-if="user == username"
            />
        </v-row>
        <br />
        <p style="word-break: break-word">{{ posttext }}</p>
        <v-divider></v-divider>
        <br />
        <ListComment :post_id="postid" />
    </v-sheet>
</template>

<script>
import ListComment from './ListComment'
import menuPost from './menuPost.vue'
import TimeAgo from 'javascript-time-ago'

export default {
    name: 'Post',
    props: ['postid', 'posttext', 'who', 'username', 'date', 'classcode'],
    data() {
        return {
            dateFormat: null,
            user: JSON.parse(localStorage.getItem('user'))?.username,
        }
    },
    mounted() {
        this.formatDate()
    },
    components: {
        ListComment,
        menuPost,
    },
    methods: {
        getListPost() {
            this.$emit('getPost')
        },
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.dateFormat = timeAgo.format(new Date(this.date))
        },
    },
}
</script>

<style></style>
