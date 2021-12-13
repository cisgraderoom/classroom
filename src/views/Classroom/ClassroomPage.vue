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
                        @click="changePage(2)"
                        :disabled="this.thisPage == 2"
                        >โจทย์ทั้งหมด</v-btn
                    >
                </v-col>
            </v-row>
            <AllPost v-show="thisPage == 1" />
            <AllProblem v-show="thisPage == 2" />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import AllPost from '../../components/AllPost'
import AllProblem from '../../components/AllProblem'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        AllPost,
        AllProblem,
    },
    data: () => ({
        thisPage: 1,
    }),
    methods: {
        changePage(page) {
            this.thisPage = page
        },
    },
}
</script>
