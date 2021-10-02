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
            >All problem</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" offset-md="3" elevation="12" xl="4" offset-xl="4">
          <h1>Problem</h1>
        </v-col>
      </v-row>
      <v-row v-for="(problem, index) in problem" :key="index"
        ><v-col md="6" offset-md="3" xl="4" offset-xl="4"
          ><Problemauto
            :problemid="problem.problemid"
            :problemtext="problem.problemtext"
            :who="problem.who"
            :date="problem.date"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="8" offset-md="2" xl="4" offset-xl="4">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import Problemauto from "../../components/Problemauto";
export default {
  name: "Problem",
  components: {
    Navbar,
    Problemauto,
  },
  data: () => ({
    problem: [
      {
        problemid: "1",
        problemtext:
          "กล่องปริศนาใบนี้บรรจุสิ่งต่าง ๆ ไว้มากมาย กล่องใบนี้จะมีอะไรบ้าง",
        who: "ธนภัทร์ อนุศาสน์อมรกุล",
        date: "01/01/2021",
      },
    ],
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "date",
      },
      { text: "case1", value: "case1" },
      { text: "case2", value: "case2" },
      { text: "case3", value: "case3" },
      { text: "case4", value: "case4" },
      { text: "case5", value: "case5" },
      { text: "sum", value: "sum" },
    ],
    desserts: [
      {
        date: "01/01/2021",
        case1: 0,
        case2: 0,
        case3: 0,
        case4: 0,
        case5: 0,
        sum: "0",
      },
    ],
  }),
};
</script>
