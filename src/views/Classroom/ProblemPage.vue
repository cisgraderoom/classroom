<template>
    <div>
        <Navbar />
        <v-container class="mb-10">
            <HeadClassroom />
            <div>
                <v-row align="center">
                    <v-col md="6" offset-md="1" xl="4" offset-xl="2">
                        <h2 class="my-2">โจทย์</h2>
                    </v-col>
                    <v-col
                        cols="2"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <SetStatusProblem
                            :problem_id="problem.problem_id"
                            :is_hidden="problem.is_hidden"
                            :key="upDateKey"
                        />
                    </v-col>
                    <v-col
                        md="2"
                        xl="2"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <EditProblem
                            :problemname="problem.problem_name"
                            :problemid="problem.problem_id"
                            :problemtext="problem.problem_desc"
                            :open_date="problem.open_at"
                            :close_date="problem.close_at"
                            :maxscore="problem.max_score"
                            @getProblem="getByIdProblem"
                            :key="upDateKey"
                        />
                    </v-col>
                </v-row>
            </div>
            <div>
                <v-row
                    ><v-col md="9" class="mx-auto" xl="7"
                        ><Problemauto
                            :problemname="problem.problem_name"
                            :problemid="problem.problem_id"
                            :problemtext="problem.problem_desc"
                            :opendate="openDateFormat"
                            :closedate="closeDateFormat"
                            :maxscore="problem.max_score"
                            :asset="problem.asset"
                            :isopen="true"
                            @getsubmitTable="getsubmitTable"
                            :key="upDateKey"
                        /><v-alert
                            text
                            type="error"
                            v-show="this.$store.state.getByIdProblem.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-col>
                </v-row>
            </div>
            <SubmitTable :submission_id="submission_id" :key="upDateKeyTable" />
        </v-container>
    </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import EditProblem from '../../components/EditProblem'
import Problemauto from '../../components/Problemauto'
import SubmitTable from '../../components/SubmitTable'
import SetStatusProblem from '../../components/SetStatusProblem'
export default {
    name: 'Problem',
    components: {
        Navbar,
        HeadClassroom,
        EditProblem,
        Problemauto,
        SubmitTable,
        SetStatusProblem,
    },
    mounted() {
        this.getByIdProblem()
    },
    data: () => ({
        problem: [],
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
        openDateFormat: null,
        closeDateFormat: null,
        errormessage: null,
        submission_id: null,
        upDateKey: 0,
        upDateKeyTable: 0,
    }),
    methods: {
        getByIdProblem() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('getByIdProblem/getByIdProblem', {
                    classcode,
                    problemid,
                })
                .then(() => {
                    this.problem = this.$store.state.getByIdProblem.problem
                    this.Loading = false
                    this.formatDate()
                    this.upDateKey += 1
                })
            return data
        },
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.openDateFormat = timeAgo.format(new Date(this.problem.open_at))
            this.closeDateFormat = timeAgo.format(
                new Date(this.problem.close_at)
            )
        },
        getsubmitTable(submissionid) {
            this.submission_id = submissionid
            this.upDateKeyTable += 1
        },
    },
}
</script>
