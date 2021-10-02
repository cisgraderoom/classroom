<template>
  <div>
    <Navbar />
    <v-container>
      <v-row>
        <v-col md="10" offset-md="1" xl="6" offset-xl="3">
          <v-sheet class="px-12 py-10 rounded white mt-10" elevation="4">
            <h1>Classroom</h1>
            <caption>
              Section
            </caption>
            <br />
            <caption>
              Nametecher
            </caption>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="10" offset-md="1" elevation="12" xl="6" offset-xl="3">
          <v-btn
            :to="`/classroom/${$route.params.code}/`"
            elevation="2"
            color="primary"
            class="mr-1"
            >All post</v-btn
          >
          <v-btn
            :to="`/classroom/${$route.params.code}/allproblem`"
            elevation="2"
            color="primary"
            disabled
            >All problem</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" offset-md="3" elevation="12" xl="4" offset-xl="4">
          <h1>All Problem</h1>
        </v-col>
      </v-row>
      <v-row v-for="(problem, index) in problem" :key="index"
        ><v-col md="6" offset-md="3" xl="4" offset-xl="4" link to="/classroom"
          ><PostProblem
            :problemid="problem.problemid"
            :problemtext="problem.problemtext"
            :who="problem.who"
            :date="problem.date"
            :path="`/classroom/${$route.params.code}/problem/${problem.problemid}`"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import PostProblem from "../../components/PostProblem";
export default {
  name: "Allproblem",
  components: {
    Navbar,
    PostProblem,
  },
  data: () => ({
    problem: [
      {
        problemid: "1",
        problemtext:
          "กล่องปริศนาใบนี้บรรจุสิ่งต่าง ๆ ไว้มากมาย กล่องใบนี้จะมีอะไรบ้าง",
        who: "ธนภัทร์ อนุศาสน์อมรกุล",
        date: "01/01/2021",
        path: "/problem/1",
      },
      {
        problemid: "2",
        problemtext:
          "ครับ สำหรับท่านที่เดินผ่านไปผ่านมานะครับ วันนี้ เฉาก๊วยชากังราวของเรานะครับ ก็ได้มาบริการท่านพ่อแม่พี่น้องกันอีกแล้วครับ อากาศร้อนๆ อย่างนี้นะครับ สำหรับท่านที่เดินผ่านไปผ่านมา ลองมาแวะชิมเฉาก๊วยแท้ๆ กันก่อนนะครับ เฉาก๊วยชากังราวของเราเป็นที่รู้จักไปทั่ว",
        who: "เฉาก๊วยชากังราว",
        date: "01/01/2021",
        path: "/problem/2",
      },
    ],
  }),
};
</script>
