<template>
    <div>
        <SkeletonListclassroom
            v-show="this.$store.state.listClassroom.isLoading"
        />
        <v-alert
            text
            class="text-center"
            type="info"
            v-show="
                this.$store.state.listClassroom.isSuccess &&
                this.$store.state.listClassroom.list.length == 0
            "
            >ไม่พบชั้นเรียน</v-alert
        >
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
                    :title="classroom.classname"
                    :section="classroom.section"
                    :teacher="classroom.name"
                    :path="classroom.classcode"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Classcard from './Classcard'
import SkeletonListclassroom from './SkeletonListclassroom'
export default {
    name: 'Listclassroom',
    components: {
        Classcard,
        SkeletonListclassroom,
    },
    mounted() {
        let data = this.$store
            .dispatch('listClassroom/listClassroom')
            .then(() => {
                this.classroom = this.$store.state.listClassroom.list
            })
        return data
    },
    data: () => ({
        classroom: [],
    }),
}
</script>

<style></style>
