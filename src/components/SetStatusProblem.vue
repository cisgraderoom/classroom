<template>
    <div>
        <v-switch elevation="2" color="primary" v-model="nowstatus">
            แก้ไขโจทย์
        </v-switch>
    </div>
</template>

<script>
export default {
    name: 'SetStatusProblem',
    props: ['problemname', 'status'],
    mounted() {
        this.setdata()
    },
    data: () => ({
        dialog: false,
        hidden: false,
        submitted: false,
        errormessage: '',
    }),

    methods: {
        setdata() {
            this.hidden = this.status
        },

        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const { problem_id, hidden, status } = this
            if (problem_id == '') {
                this.errormessage = 'Please enter your Text Post'
                commit('editProblem/editProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }

            if (hidden != status) {
                await dispatch('editProblem/editProblem', {
                    hidden: hidden,
                    problemId: problem_id,
                    classcode,
                })
                if (state?.editProblem?.isSuccess) {
                    this.closedialog()
                    this.$emit('getPost')
                }
                if (state?.editProblem?.isFailed) {
                    this.errormessage =
                        state.editProblem.message ?? 'ไม่สามารถแก้ไขโพสต์ได้'
                }
            }
        },
    },
}
</script>

<style></style>
