<template>
    <div>
        <v-dialog v-model="dialog" max-width="1400">
            <template v-slot:activator="{ on, attrs }">
                <v-btn small color="secondary" v-bind="attrs" v-on="on"
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
                            ><b>Compar :</b> {{ compar }}
                            <br />
                            <b>Code :</b>
                            <br />
                            <pre>
                                <code>
                                    {{ code_compar }}
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
                    v-show="this.$store.state.kickStudent.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.kickStudent.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'viewCode2',
    props: ['owner', 'compar', 'problem_id'],
    data() {
        return {
            dialog: false,
            code_owner: '',
            code_compar: '',
            errormessage: '',
        }
    },
    methods: {
        closeDialog() {
            // const { commit } = this.$store
            // commit('kickStudent/kickStudentFailure', {
            //     isFailed: false,
            //     isLoading: false,
            //     isSuccess: false,
            // })
            this.dialog = false
        },
    },
}
</script>

<style></style>
