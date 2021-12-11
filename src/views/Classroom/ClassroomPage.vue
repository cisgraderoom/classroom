<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom
                :classname="classroom.classname"
                :section="classroom.section"
                :nametecher="classroom.nametecher"
            />
            <v-row>
                <v-col
                    md="10"
                    offset-md="1"
                    elevation="12"
                    xl="6"
                    offset-xl="3"
                >
                    <v-btn elevation="2" color="primary" class="mr-1" disabled
                        >โพสทั้งหมด</v-btn
                    >
                    <v-btn
                        :to="`/classroom/${$route.params.code}/allproblem`"
                        elevation="2"
                        color="primary"
                        >โจทย์ทั้งหมด</v-btn
                    >
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" offset-md="3" elevation="12" xl="4" offset-xl="4">
                    <h1>โพสทั้งหมด</h1>
                </v-col>
            </v-row>
            <ListPost />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import ListPost from '../../components/ListPost'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        ListPost,
    },
    data: () => ({
        classroom: {
            classname: 'Classroom',
            section: 'Section',
            nametecher: 'Nametecher',
        },
    }),
}
</script>
