<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom />
            <v-row>
                <v-col
                    md="10"
                    offset-md="1"
                    elevation="12"
                    xl="6"
                    offset-xl="3"
                >
                    <v-btn
                        elevation="2"
                        color="primary"
                        class="mr-1"
                        @click="changePage(1)"
                        :disabled="this.thisPage == 1"
                        >โพสต์ทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="primary"
                        class="mr-1"
                        @click="changePage(2)"
                        :disabled="this.thisPage == 2"
                        >โจทย์ทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="success"
                        class="mr-1"
                        @click="changePage(3)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 3"
                        >เพิ่มโจทย์</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="secondary"
                        class="mr-1"
                        @click="changePage(4)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 4"
                        >คะแนนทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="secondary"
                        class="mr-1"
                        @click="changePage(5)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 5"
                        >ตรวจใหม่ & ตรวจคล้ายคลึง</v-btn
                    >
                </v-col>
            </v-row>
            <AllPost v-show="thisPage == 1" />
            <AllProblem v-show="thisPage == 2" />
            <AddProblem v-show="thisPage == 3" />
            <AllScore v-show="thisPage == 4" />
            <RecheckPlagiarism v-show="thisPage == 5" />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import AllPost from '../../components/AllPost'
import AllProblem from '../../components/AllProblem'
import AddProblem from '../../components/AddProblem'
import AllScore from '../../components/AllScore'
import RecheckPlagiarism from '../../components/RecheckPlagiarism'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        AllPost,
        AllProblem,
        AddProblem,
        AllScore,
        RecheckPlagiarism,
    },
    data: () => ({
        thisPage: 1,
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
    methods: {
        changePage(page) {
            this.thisPage = page
        },
    },
}
</script>
