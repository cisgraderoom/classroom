<template>
    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
        <v-row align="center">
            <v-col cols="2" sm="1" md="1" lg="1" xl="1">
                <v-icon color="deep-orange darken-1" large
                    >mdi-account-circle</v-icon
                >
            </v-col>
            <v-col cols="8" sm="10" md="10">
                <h3>{{ who }}</h3>
                <h5>
                    {{ date }}
                </h5>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </v-col>
        </v-row>
        <br />
        <p>{{ posttext }}</p>
        <v-divider></v-divider>
        <br />
        <ListComment :postid="getpostid" />
        <!-- <Comment :postid="getpostid" /> -->
        <!-- <AddComment :postid="getpostid" /> -->
    </v-sheet>
</template>

<script>
import ListComment from './ListComment'
export default {
    name: 'Post',
    props: ['postid', 'posttext', 'who', 'date'],
    components: {
        ListComment,
    },
    data() {
        return {
            getpostid: this.postid,
        }
    },
}
</script>

<style></style>
