<template>
    <div>
        <SkeletonPost v-show="this.$store.state.listPostProblem.isLoading" />
        <v-row
            v-show="
                this.$store.state.listPostProblem.isSuccess &&
                this.$store.state.listPostProblem.list.length == 0
            "
        >
            <v-col md="10" xl="9">
                <v-alert text class="text-center" type="info"
                    >ไม่มีโจทย์ในชั้นเรียน</v-alert
                >
            </v-col>
        </v-row>
        <v-row
            v-for="(problem, index) in problem"
            :key="index"
            ref="infinite-list"
            ><v-col md="10" xl="9">
                <v-lazy transition="fade-transition">
                    <PostProblem
                        :problemid="problem.problem_id"
                        :problemname="problem.problem_name"
                        :problemtext="problem.problem_desc"
                        :who="problem.username"
                        :opendate="problem.open_at"
                        :closedate="problem.close_at"
                        :maxscore="problem.max_score"
                        :ishidden="problem.is_hidden"
                        :key="upDateKey"
                        :path="`/classroom/${$route.params.code}/problem/${problem.problem_id}`"
                /></v-lazy>
            </v-col>
        </v-row>
        <!-- <v-col md="10" class="mx-auto" xl="9">
            <div
                ref="infinitescrolltrigger"
                id="scoll-trigger"
                :disabled="this.$store.state.nextPost.isLoading"
            ></div>
        </v-col>
        <SkeletonPost v-show="this.$store.state.nextPost.isLoading" /> -->
    </div>
</template>

<script>
import PostProblem from './PostProblem'
import SkeletonPost from './SkeletonPost'
export default {
    name: 'ListPostProblem',
    components: {
        PostProblem,
        SkeletonPost,
    },
    mounted() {
        this.getListPostProblem()
    },
    data: () => ({
        problem: [],
        isActive: false,
        upDateKey: 0,
    }),
    methods: {
        getListPostProblem() {
            const classcode = this.$route.params.code
            let data = this.$store
                .dispatch('listPostProblem/listPostProblem', { classcode })
                .then(() => {
                    this.problem = this.$store.state.listPostProblem.list
                    this.hasNext = this.$store.state.listPostProblem.hasNext
                    this.upDateKey += 1
                })
            return data
        },
    },
}
</script>

<style></style>
