<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">โจทย์ทั้งหมด</h2>
            </v-col>
        </v-row>
        <ListPostProblem />
    </div>
</template>

<script>
import ListPostProblem from './ListPostProblem'
export default {
    name: 'Allproblem',
    components: {
        ListPostProblem,
    },
}
</script>

<style></style>
