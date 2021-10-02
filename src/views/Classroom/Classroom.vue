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
          <v-btn elevation="2" color="primary" class="mr-1" disabled
            >All post</v-btn
          >
          <v-btn to="/classroom/allproblem" elevation="2" color="primary"
            >All problem</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" offset-md="3" elevation="12" xl="4" offset-xl="4">
          <h1>All Post</h1>
        </v-col>
      </v-row>
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
    </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
export default {
  name: "Classroom",
  components: {
    Navbar,
    Post,
  },
  data: () => ({
    classroom: [
      { classname: "Classroom", section: "Section", techer: "Nametecher" },
    ],
    post: [
      {
        postid: "1",
        posttext:
          "สวัสดีนักศึกษาที่ลงทำเบียนวิชาการสื่อสารไร้สายวันนี้เรามีเรียนเพื่อแนะนำรายวิชานะครับออยากให้นักศึกษาแอดเข้ากลุ่มไลน์ตามQRcodesนี้ครับ",
        who: "ธนภัทร์ อนุศาสน์อมรกุล",
        date: "01/01/2021",
      },
      {
        postid: "2",
        posttext:
          "ครับ สำหรับท่านที่เดินผ่านไปผ่านมานะครับ วันนี้ เฉาก๊วยชากังราวของเรานะครับ ก็ได้มาบริการท่านพ่อแม่พี่น้องกันอีกแล้วครับ อากาศร้อนๆ อย่างนี้นะครับ สำหรับท่านที่เดินผ่านไปผ่านมา ลองมาแวะชิมเฉาก๊วยแท้ๆ กันก่อนนะครับ เฉาก๊วยชากังราวของเราเป็นที่รู้จักไปทั่ว",
        who: "เฉาก๊วยชากังราว",
        date: "01/01/2021",
      },
      {
        postid: "3",
        posttext: "ยัยธารใส พรุ่งนี้ไอจะขยี้ยูให้แหลกคึ",
        who: "ฟิลลิปส์",
        date: "01/01/2021",
      },
      { postid: "4", posttext: "posttext", who: "who", date: "DATE" },
    ],
  }),
};
</script>
