<template>
    <div>
        <v-row align="center">
            <v-col>
                <v-file-input
                    truncate-length="15"
                    label="File input"
                    v-model="file"
                    accept=".c,.cpp,.java"
                    show-size
                    v-show="!$store.state.getByIdProblem.isLoading"
                    :disabled="
                        $store.state.submitProblem.isLoading ||
                        $store.state.submitTable.isLoading
                    "
                ></v-file-input>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    elevation="2"
                    color="primary"
                    class="mr-1"
                    v-show="!$store.state.getByIdProblem.isLoading"
                    :disabled="
                        $store.state.submitProblem.isLoading ||
                        $store.state.submitTable.isLoading
                    "
                    @click="handleSubmit"
                    >submit</v-btn
                >
            </v-col>
        </v-row>
        <v-alert text type="success" v-show="success"> ส่งแล้ว </v-alert>
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
        success: false,
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
                this.file = null
                this.success = true
                this.$emit(
                    'getsubmitTable',
                    state.submitProblem.data.submission_id
                )
                setTimeout(() => (this.success = false), 3000)
            }
        },
    },
}
</script>

<style></style>
