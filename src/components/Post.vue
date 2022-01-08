<template>
    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
        <v-row align="center">
            <v-col cols="2" sm="1" md="1" lg="1" xl="1">
                <v-icon color="deep-orange darken-1" large
                    >mdi-account-circle</v-icon
                >
            </v-col>
            <v-col cols="8" sm="10" md="10">
                <h3 class="deep-orange--text text--darken-1">{{ who }}</h3>
                <h5 class="grey--text text--darken-1">
                    {{ date }}
                </h5>
            </v-col>
            <v-menu offset-y transition="scroll-y-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-col cols="1" sm="1" md="1">
                        <v-btn icon v-bind="attrs" v-on="on"
                            ><v-icon>mdi-dots-vertical</v-icon></v-btn
                        >
                    </v-col>
                </template>
                <v-list v-show="user == username">
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
        </v-row>
        <br />
        <p>{{ posttext }}</p>
        <v-divider></v-divider>
        <br />
        <ListComment :post_id="postid" />
    </v-sheet>
</template>

<script>
import ListComment from './ListComment'
import EditPost from './EditPost.vue'
import DeletePost from './DeletePost.vue'
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'
// TimeAgo.addDefaultLocale(en)

export default {
    name: 'Post',
    props: ['postid', 'posttext', 'who', 'username', 'date', 'classcode'],
    data() {
        return {
            dateFormat: null,
            user: JSON.parse(localStorage.getItem('user'))?.username,
        }
    },
    // mounted() {
    //     this.formatDate()
    // },
    components: {
        ListComment,
        EditPost,
        DeletePost,
    },
    methods: {
        getListPost() {
            this.$emit('getPost')
        },
        // formatDate() {
        //     console.log(this.date)
        //     const timeAgo = new TimeAgo('en-US')
        //     this.dateFormat = timeAgo.format(this.date)
        //     console.log(this.dateFormat)
        // },
    },
}
</script>

<style></style>
