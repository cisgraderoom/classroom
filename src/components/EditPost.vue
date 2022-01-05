<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on">
                    แก้ไขโพสต์
                </v-list-item-title>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">แก้ไขโพสต์</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="textpost"
                                        label="ข้อความโพสต์"
                                        :disabled="
                                            this.$store.state.editPost.isLoading
                                        "
                                        required
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.editPost.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.editPost.isLoading"
                        ></v-progress-linear>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="this.$store.state.editPost.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.editPost.isLoading"
                    >
                        แก้ไขโพสต์
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'EditPost',
    props: ['post_id', 'post_text', 'class_code'],
    data: () => ({
        dialog: false,
        textpost: '',
        submitted: false,
        errormessage: '',
    }),
    mounted() {
        this.textpost = this.post_text
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { textpost, post_id, class_code } = this
            if (textpost == '') {
                this.errormessage = 'Please enter your Text Post'
                commit('editPost/editPostFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (textpost != '') {
                await dispatch('editPost/editPost', {
                    text: textpost,
                    postid: post_id,
                    classcode: class_code,
                })
                if (state?.editPost?.isSuccess) {
                    this.closedialog()
                    this.$emit('getPost')
                }
                if (state?.editPost?.isFailed) {
                    this.errormessage =
                        state.editPost.message ?? 'ไม่สามารถลบโพสต์'
                }
            }
        },
        closedialog() {
            this.textpost = this.post_text
            this.dialog = false
        },
    },
}
</script>

<style></style>
