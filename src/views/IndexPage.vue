<template>
    <div>
        <Navbar />
        <v-container>
            <v-row>
                <v-col
                    v-show="checkAddClassroom == 'student'"
                    md="2"
                    class="my-13"
                >
                    <Joinclassroom />
                </v-col>
                <v-col
                    v-show="
                        checkAddClassroom == 'superteacher' ||
                        checkAddClassroom == 'teacher'
                    "
                    md="2"
                    class="my-13 mx-2"
                >
                    <Addclassroom />
                </v-col>
                <v-col
                    v-show="checkAddClassroom == 'superteacher'"
                    md="2"
                    class="my-13 mx-2 mt-10"
                >
                    <v-btn
                        elevation="2"
                        color="secondary"
                        block
                        v-bind="attrs"
                        to="/manage"
                    >
                        จัดการผู้ใช้งาน
                    </v-btn>
                </v-col>
            </v-row>
            <Listclassroom />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Listclassroom from '../components/Listclassroom'
import Joinclassroom from '../components/Joinclassroom'
import Addclassroom from '../components/Addclassroom'
export default {
    name: 'Index',
    components: {
        Navbar,
        Listclassroom,
        Addclassroom,
        Joinclassroom,
    },
    computed: {
        user() {
            return this.$store.state.authentication.user
        },

        users() {
            return this.$store.state.users.all
        },
        // listClassroom() {
        //     // let data = this.$store
        //     //     .dispatch('listClassroom/listClassroom')
        //     //     .then((data) => {
        //     //         // console.log(this.$store.state.listClassroom)
        //     //         // console.log(this.$store.state.listClassroom.isFailed)
        //     //         return data
        //     //     })
        //     // console.log(data)
        //     return data
        // },
    },

    data: () => ({
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
}
</script>
