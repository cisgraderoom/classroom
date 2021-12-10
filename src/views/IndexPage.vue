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
            </v-row>
            <v-alert
                text
                class="text-center"
                type="error"
                v-show="this.$store.state.listClassroom.isFailed"
                >ไม่สามารถแสดงชั้นเรียนได้</v-alert
            >
            <v-row class="mt-0 mb-10">
                <v-col
                    md="3"
                    elevation="12"
                    xl="2"
                    v-for="(classroom, index) in classroom"
                    :key="index"
                >
                    <Classcard
                        :title="classroom.title"
                        :section="classroom.section"
                        :teacher="classroom.teacher"
                        :path="classroom.classcode"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Classcard from '../components/Classcard'
import Joinclassroom from '../components/Joinclassroom'
import Addclassroom from '../components/Addclassroom'
export default {
    name: 'Index',
    components: {
        Navbar,
        Classcard,
        Addclassroom,
        Joinclassroom,
    },
    mounted() {
        let data = this.$store
            .dispatch('listClassroom/listClassroom')
            .then((res) => {
                console.log(res)
            })
        console.log(data)
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
        classroom: [
            {
                title: 'Classroom name',
                section: 'section',
                teacher: 'teacher',
                classcode: '/classroom/1',
            },
        ],
    }),
}
</script>
