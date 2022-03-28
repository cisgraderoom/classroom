<template>
    <div>
        <v-dialog v-model="dialog" max-width="1400">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                    @click="getPlagiarismCode"
                    >ดู Code</v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">ดู Code</span>
                </v-card-title>
                <v-row>
                    <v-col>
                        <v-card-text
                            ><b>Owner :</b> {{ owner }}
                            <br />
                            <b>Code :</b>
                            <br />
                            <pre>
                                <code>
                                    {{ code_owner }}
                                </code>
                            </pre>
                        </v-card-text>
                    </v-col>
                    <v-col>
                        <v-card-text
                            ><b>Compare :</b> {{ compare }}
                            <br />
                            <b>Code :</b>
                            <br />
                            <pre>
                                <code>
                                    {{ code_compare }}
                                </code>
                            </pre>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" text @click="closeDialog">
                        ปิด
                    </v-btn>
                </v-card-actions>
                <v-alert
                    text
                    type="error"
                    v-show="this.$store.state.getPlagiarismCode.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.getPlagiarismCode.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'viewCode2',
    props: ['owner', 'compare', 'problem_id'],
    data() {
        return {
            dialog: false,
            code_owner: '',
            code_compare: '',
            errormessage: '',
        }
    },
    methods: {
        async getPlagiarismCode() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            if (classcode && this.problem_id) {
                this.loading = true
                await dispatch('getPlagiarismCode/getPlagiarismCode', {
                    classcode,
                    problem_id: this.problem_id,
                    owner: this.owner,
                    compare: this.compare,
                })
                if (state.getPlagiarismCode.isFailed) {
                    this.errormessage =
                        state.getPlagiarismCode.error ?? 'ไม่สามารถแสดงได้'
                    this.loading = false
                }
                if (state.getPlagiarismCode.isSuccess) {
                    this.code_owner = state.getPlagiarismCode.data.owner.code
                    this.code_compare =
                        state.getPlagiarismCode.data.compare.code
                }
                return
            } else {
                commit('getPlagiarismCode/getPlagiarismCodeFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
        },
        closeDialog() {
            this.code_owner = null
            this.code_compare = null
            this.dialog = false
        },
    },
}
</script>

<style lang="css" scoped>
pre code {
    background-color: #eee;
    border: 1px solid #eee;
    border-radius: 10px;
    display: block;
    padding: 20px;
}
</style>
