<template>
    <div>
        <v-alert
            text
            class="text-center"
            type="error"
            v-show="this.$store.state.listComment.isFailed"
            >โหลดคอมเม้นล้มเหลว</v-alert
        >
        <v-btn
            text
            class="mb-5"
            plain
            v-show="textComment.length > 2 && isGetMore == false"
            @click="getMoreComment"
        >
            โหลดคอมเม้นก่อนหน้าเพิ่มเติม......
        </v-btn>
        <v-row v-for="(comment, index) in showComment" :key="index">
            <v-col class="py-0">
                <v-lazy transition="fade-transition">
                    <Comment
                        :comment_id="comment.comment_id"
                        :post_id="comment.post_id"
                        :classcode="comment.classcode"
                        :commenttext="comment.text"
                        :who="comment.name"
                        :role="comment.role"
                        @getComment="getListComment"
                    />
                </v-lazy>
            </v-col>
        </v-row>
        <AddComment :postid="getpostid" @getComment="getListComment" />
    </div>
</template>

<script>
import Comment from './Comment'
import AddComment from './AddComment'
export default {
    name: 'ListComment',
    components: {
        Comment,
        AddComment,
    },
    props: ['postid'],
    mounted() {
        this.getListComment()
    },
    data() {
        return {
            textComment: [],
            isActive: false,
            getpostid: this.postid,
            showComment: [],
            isGetMore: false,
        }
    },

    methods: {
        getListComment() {
            const classcode = this.$route.params.code
            const { getpostid } = this
            let data = this.$store
                .dispatch('listComment/listComment', {
                    classcode,
                    postid: getpostid,
                })
                .then(() => {
                    if (this.isGetMore) {
                        this.showComment = this.$store.state.listComment.list
                    } else {
                        this.textComment = this.$store.state.listComment.list
                        this.showComment =
                            this.$store.state.listComment.list.slice(-2)
                    }
                })
            return data
        },
        getMoreComment() {
            this.isGetMore = true
            this.showComment = this.textComment
        },
    },
}
</script>

<style></style>
