<template>
    <div>
        <SkeletonPost v-show="this.$store.state.listPost.isLoading" />
        <v-row
            v-for="(problem, index) in problem"
            :key="index"
            ref="infinite-list"
            ><v-col md="10" xl="9">
                <v-lazy transition="fade-transition">
                    <PostProblem
                        :problemid="problem.post_id"
                        :problemtext="problem.text"
                        :who="problem.name"
                        :date="problem.updated_at"
                        :key="upDateKey"
                        :path="`/classroom/${$route.params.code}/problem/${problem.problemid}`"
                        target="_blank"
                /></v-lazy>
            </v-col>
        </v-row>
        <v-col md="10" class="mx-auto" xl="9">
            <div
                ref="infinitescrolltrigger"
                id="scoll-trigger"
                :disabled="this.$store.state.nextPost.isLoading"
            ></div>
        </v-col>
        <SkeletonPost v-show="this.$store.state.nextPost.isLoading" />
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
        this.getNextPostProblem()
    },
    data: () => ({
        problem: [],
        isActive: false,
        upDateKey: 0,
        currentPage: 1,
        hasNext: false,
        // problem: [
        //     {
        //         problemid: '1',
        //         problemtext:
        //             'กล่องปริศนาใบนี้บรรจุสิ่งต่าง ๆ ไว้มากมาย กล่องใบนี้จะมีอะไรบ้าง',
        //         who: 'ธนภัทร์ อนุศาสน์อมรกุล',
        //         date: '01/01/2021',
        //         path: '/problem/1',
        //     },
        //     {
        //         problemid: '2',
        //         problemtext:
        //             'ครับ สำหรับท่านที่เดินผ่านไปผ่านมานะครับ วันนี้ เฉาก๊วยชากังราวของเรานะครับ ก็ได้มาบริการท่านพ่อแม่พี่น้องกันอีกแล้วครับ อากาศร้อนๆ อย่างนี้นะครับ สำหรับท่านที่เดินผ่านไปผ่านมา ลองมาแวะชิมเฉาก๊วยแท้ๆ กันก่อนนะครับ เฉาก๊วยชากังราวของเราเป็นที่รู้จักไปทั่ว',
        //         who: 'เฉาก๊วยชากังราว',
        //         date: '01/01/2021',
        //         path: '/problem/2',
        //     },
        // ],
    }),
    methods: {
        getListPostProblem() {
            const classcode = this.$route.params.code
            let data = this.$store
                .dispatch('listPost/listPost', { classcode })
                .then(() => {
                    this.problem = this.$store.state.listPost.list
                    this.hasNext = this.$store.state.listPost.hasNext
                    this.upDateKey += 1
                })
            return data
        },
        getNextPostProblem() {
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
                                    this.problem = [
                                        ...this.problem,
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
