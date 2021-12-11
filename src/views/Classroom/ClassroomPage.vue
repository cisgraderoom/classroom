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
                    <v-btn elevation="2" color="primary" class="mr-1" disabled
                        >โพสต์ทั้งหมด</v-btn
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
                <v-col md="9" class="mx-auto" xl="5" elevation="12">
                    <h2>โพสต์ทั้งหมด</h2>
                </v-col>
            </v-row>
            <AddPost />
            <ListPost />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import AddPost from '../../components/AddPost'
import ListPost from '../../components/ListPost'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        AddPost,
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
