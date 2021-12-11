<template>
    <div>
        <v-row v-for="(post, index) in post" :key="index"
            ><v-col md="6" offset-md="3" xl="4" offset-xl="4">
                <Post
                    :postid="post.postid"
                    :posttext="post.posttext"
                    :who="post.who"
                    :date="post.date"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AddPost',
    data: () => ({
        post: [],
    }),
}
</script>

<style></style>
