<template>
    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
        <v-row align="center">
            <v-col sm="1" md="1" lg="1" xl="1">
                <v-icon color="deep-orange darken-1" large
                    >mdi-account-circle</v-icon
                >
            </v-col>
            <v-col md="11">
                <h3>{{ who }}</h3>
                <h5>
                    {{ date }}
                </h5>
            </v-col>
        </v-row>
        <br />
        <p>{{ posttext }}</p>
        <v-divider></v-divider>
        <br />
        <Comment :postid="getpostid" />
        <AddComment :postid="getpostid" />
    </v-sheet>
</template>

<script>
import Comment from './Comment'
import AddComment from './AddComment'
export default {
    name: 'Post',
    props: ['postid', 'posttext', 'who', 'date'],
    components: {
        Comment,
        AddComment,
    },
    data() {
        return {
            getpostid: this.postid,
        }
    },
}
</script>

<style></style>
