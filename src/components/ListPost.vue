<template>
    <div>
        <AddPost
            v-show="
                checkAddClassroom == 'superteacher' ||
                checkAddClassroom == 'teacher'
            "
            @getPost="getListPost"
        />
        <SkeletonPost v-show="this.$store.state.listPost.isLoading" />
        <v-alert
            text
            class="text-center"
            type="info"
            v-show="
                this.$store.state.listPost.isSuccess &&
                this.$store.state.listPost.list.length == 0
            "
            >ไม่มีโพสในชั้นเรียน</v-alert
        >

        <v-row v-for="(post, index) in textPost" :key="index">
            <v-col md="9" class="mx-auto" xl="5">
                <v-lazy transition="fade-transition">
                    <Post
                        :postid="post.post_id"
                        :posttext="post.text"
                        :who="post.name"
                        :date="post.updated_at"
                    />
                </v-lazy>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Post from './Post'
import AddPost from './AddPost'
import SkeletonPost from './SkeletonPost'
export default {
    name: 'ListPost',
    components: {
        Post,
        AddPost,
        SkeletonPost,
    },
    mounted() {
        this.getListPost()
    },
    data: () => ({
        textPost: [],
        isActive: false,
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
    methods: {
        getListPost() {
            const classcode = this.$route.params.code
            let data = this.$store
                .dispatch('listPost/listPost', { classcode })
                .then(() => {
                    this.textPost = this.$store.state.listPost.list
                })
            return data
        },
    },
}
</script>

<style></style>
