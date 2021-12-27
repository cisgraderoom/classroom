<template>
    <div>
        <v-row v-for="(problem, index) in problem" :key="index"
            ><v-col md="9" class="mx-auto" xl="5">
                <v-lazy transition="fade-transition">
                    <PostProblem
                        :problemid="problem.problemid"
                        :problemtext="problem.problemtext"
                        :who="problem.who"
                        :date="problem.date"
                        :path="`/classroom/${$route.params.code}/problem/${problem.problemid}`"
                /></v-lazy>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PostProblem from './PostProblem'
export default {
    name: 'ListPostProblem',
    components: {
        PostProblem,
    },
    data: () => ({
        problem: [
            {
                problemid: '1',
                problemtext:
                    'กล่องปริศนาใบนี้บรรจุสิ่งต่าง ๆ ไว้มากมาย กล่องใบนี้จะมีอะไรบ้าง',
                who: 'ธนภัทร์ อนุศาสน์อมรกุล',
                date: '01/01/2021',
                path: '/problem/1',
            },
            {
                problemid: '2',
                problemtext:
                    'ครับ สำหรับท่านที่เดินผ่านไปผ่านมานะครับ วันนี้ เฉาก๊วยชากังราวของเรานะครับ ก็ได้มาบริการท่านพ่อแม่พี่น้องกันอีกแล้วครับ อากาศร้อนๆ อย่างนี้นะครับ สำหรับท่านที่เดินผ่านไปผ่านมา ลองมาแวะชิมเฉาก๊วยแท้ๆ กันก่อนนะครับ เฉาก๊วยชากังราวของเราเป็นที่รู้จักไปทั่ว',
                who: 'เฉาก๊วยชากังราว',
                date: '01/01/2021',
                path: '/problem/2',
            },
        ],
    }),
}
</script>

<style></style>
