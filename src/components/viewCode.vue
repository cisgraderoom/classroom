<template>
    <div>
        <v-dialog v-model="dialog" max-width="1000">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                    :disabled="!code"
                    >ดู Code</v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">ดู Code</span>
                </v-card-title>
                <v-card-text
                    ><b>Username :</b> {{ username }}
                    <br />
                    <b>Code :</b>
                    <br />
                    <pre>
                        <code>
                            {{ code }}
                        </code>
                        
                    </pre>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="closeDialog"
                        :disabled="this.$store.state.kickStudent.isLoading"
                    >
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
    name: 'viewCode',
    props: ['username', 'is_delete', 'code'],
    data() {
        return {
            dialog: false,
            errormessage: '',
        }
    },
    methods: {
        closeDialog() {
            const { commit } = this.$store
            commit('kickStudent/kickStudentFailure', {
                isFailed: false,
                isLoading: false,
                isSuccess: false,
            })
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
