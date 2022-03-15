<template>
    <div>
        <v-switch
            elevation="2"
            color="primary"
            v-model="hidden"
            :label="`สถานะ : ${textstatus}`"
            :disabled="$store.state.setStatusProblem.isLoading"
            @click="handleSubmit"
        >
        </v-switch>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="primary"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    ปิด
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'SetStatusProblem',
    props: ['problem_id', 'is_hidden'],
    mounted() {
        this.setdata()
    },
    data: () => ({
        hidden: false,
        sethidden: false,
        snackbar: false,
        text: 'เปิด/ปิด โจทย์สำเร็จ',
        textstatus: 'ปิด',
        timeout: 2000,
        submitted: false,
        errormessage: '',
    }),

    methods: {
        setdata() {
            if (this.is_hidden == 1) {
                this.hidden = false
                this.textstatus = 'ปิด'
            } else {
                this.hidden = true
                this.textstatus = 'เปิด'
            }
        },

        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const { problem_id, hidden } = this
            if (problem_id == '') {
                this.text = 'ไม่สามารถ เปิด/ปิด โจทย์ได้'
                commit('setStatusProblem/setStatusProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (hidden == true) {
                this.sethidden = false
                this.textstatus = 'เปิด'
            } else {
                this.sethidden = true
                this.textstatus = 'ปิด'
            }
            if (hidden != null) {
                await dispatch('setStatusProblem/setStatusProblem', {
                    hidden: this.sethidden,
                    problemid: problem_id,
                    classcode,
                })
                if (state?.setStatusProblem?.isSuccess) {
                    this.text = 'เปิด/ปิด โจทย์สำเร็จ'
                    this.snackbar = true
                }
                if (state?.setStatusProblem?.isFailed) {
                    this.setdata()
                    this.text =
                        state.setStatusProblem.error ??
                        'ไม่สามารถ เปิด/ปิด โจทย์ได้'
                    this.snackbar = true
                }
            }
        },
    },
}
</script>

<style></style>
