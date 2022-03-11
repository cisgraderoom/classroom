<template>
    <div>
        <v-row align="center">
            <v-col>
                <v-file-input
                    truncate-length="15"
                    label="File input"
                    v-model="file"
                    accept="code/*"
                    show-size
                    v-show="!$store.state.getByIdProblem.isLoading"
                    :disabled="$store.state.submitProblem.isLoading"
                ></v-file-input>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    elevation="2"
                    color="primary"
                    class="mr-1"
                    v-show="!$store.state.getByIdProblem.isLoading"
                    :disabled="$store.state.submitProblem.isLoading"
                    @click="handleSubmit"
                    >submit</v-btn
                >
            </v-col>
        </v-row>
        <v-alert
            text
            type="success"
            v-show="this.$store.state.submitProblem.isSuccess"
        >
            ส่งแล้ว
        </v-alert>
        <v-alert
            text
            type="error"
            v-show="this.$store.state.submitProblem.isFailed"
        >
            {{ errormessage }}
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'SubmitProblem',
    props: ['problemid'],
    data: () => ({
        file: null,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            if (this.file == null) {
                this.errormessage = 'โปรดแนบไฟล์ที่จะส่ง'
                commit('submitProblem/submitProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('submitProblem/submitProblem', {
                classcode,
                problemid,
                code: this.file,
            })
            if (state.submitProblem.isFailed) {
                this.errormessage =
                    state.submitProblem.error ?? 'ไม่สามารถส่งได้'
            }
            if (state.submitProblem.isSuccess) {
                this.$emit('getsubmitTable')
            }
        },
    },
}
</script>

<style></style>
