<template>
    <v-row>
        <v-col md="9" class="mx-auto" xl="7">
            <v-data-table
                :headers="headers"
                :items="score"
                :items-per-page="5"
                hide-default-footer
                class="elevation-1"
                v-if="status"
            ></v-data-table>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'SubmitTable',
    data: () => ({
        errormessage: null,
        headers: [
            {
                text: 'Date',
                align: 'start',
                sortable: false,
                value: 'date',
            },
            { text: 'case1', value: 'case1', sortable: false },
            { text: 'case2', value: 'case2', sortable: false },
            { text: 'Score', value: 'score', sortable: false },
        ],
        score: [
            {
                date: '01/01/2021',
                case1: 0,
                case2: 0,
                score: '0',
            },
        ],
        status: false,
    }),
    mounted() {
        this.submitTable()
    },
    methods: {
        submitTable() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('submitTable/submitTable', {
                    classcode,
                    problemid,
                })
                .then(() => {
                    this.score = this.$store.state.submitTable.score
                    this.status = this.$store.state.submitTable.status
                })
            return data
        },
    },
}
</script>

<style></style>
