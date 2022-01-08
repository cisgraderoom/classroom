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

        <v-row
            v-for="(post, index) in textPost"
            :key="index"
            ref="infinite-list"
        >
            <v-col md="9" class="mx-auto" xl="5">
                <v-lazy transition="fade-transition">
                    <Post
                        :postid="post.post_id"
                        :posttext="post.text"
                        :who="post.name"
                        :date="post.updated_at"
                        :classcode="post.classcode"
                        @getPost="getListPost"
                        :key="upDateKey"
                    />
                </v-lazy>
            </v-col>
        </v-row>
        <v-col md="9" class="mx-auto" xl="5">
            <div
                ref="infinitescrolltrigger"
                id="scoll-trigger"
                :disabled="this.$store.state.nextPost.isLoading"
            ></div>
            <SkeletonPost v-show="this.$store.state.nextPost.isLoading" />
        </v-col>
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
        this.getNextPost()
    },

    data: () => ({
        textPost: [],
        isActive: false,
        upDateKey: 0,
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
        currentPage: 1,
        hasNext: false,
    }),
    methods: {
        getListPost() {
            const classcode = this.$route.params.code
            let data = this.$store
                .dispatch('listPost/listPost', { classcode })
                .then(() => {
                    this.textPost = this.$store.state.listPost.list
                    this.hasNext = this.$store.state.listPost.hasNext
                    this.upDateKey += 1
                })
            return data
        },
        getNextPost() {
            if (!this.$store.state.nextPost.isLoading) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0 && this.hasNext) {
                            const classcode = this.$route.params.code
                            this.currentPage += 1
                            let data = this.$store
                                .dispatch('nextPost/nextPost', {
                                    classcode,
                                    currentPage: this.currentPage,
                                })
                                .then(() => {
                                    this.textPost = [
                                        ...this.textPost,
                                        ...this.$store.state.nextPost.list,
                                    ]
                                    this.hasNext =
                                        this.$store.state.nextPost.hasNext
                                })
                            return data
                        }
                    })
                })
                observer.observe(this.$refs.infinitescrolltrigger)
            }
        },
    },
}
</script>

<style></style>
