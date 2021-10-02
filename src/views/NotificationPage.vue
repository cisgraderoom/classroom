<template>
  <div>
    <Navbar />
    <v-container>
      <v-row>
        <v-col md="6" offset-md="3" elevation="12" xl="4" offset-xl="4">
          <h1>Notification</h1>
        </v-col>
      </v-row>
      <v-row v-for="(noti, index) in noti" :key="index"
        ><v-col md="6" offset-md="3" xl="4" offset-xl="4">
          <Notification
            :notiid="noti.notiid"
            :notitext="noti.notitext"
            :who="noti.who"
            :date="noti.date"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
export default {
  name: "Editaccount",
  components: {
    Navbar,
    Notification,
  },
  data: () => ({
    noti: [
      {
        notiid: "1",
        notitext: "ส่งงานด้วย",
        who: "จารเอง",
        date: "01/01/2021",
      },
      {
        notiid: "2",
        notitext: "ไม่รู้",
        who: "ใครอะ",
        date: "01/01/2021",
      },
      {
        notiid: "3",
        notitext: "หน่านี้",
        who: "a",
        date: "01/01/2021",
      },
      {
        notiid: "4",
        notitext: "Nani",
        who: "a",
        date: "01/01/2021",
      },
    ],
  }),
};
</script>
