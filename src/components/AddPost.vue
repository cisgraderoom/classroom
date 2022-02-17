<template>
    <div>
        <v-row
            ><v-col md="10" xl="9">
                <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                    <v-textarea
                        label="เพิ่มโพสต์"
                        v-model="text"
                        :disabled="this.$store.state.addPost.isLoading"
                    ></v-textarea>
                    <v-alert
                        text
                        type="error"
                        v-show="this.$store.state.addPost.isFailed"
                    >
                        {{ errormessage }}
                    </v-alert>
                    <div class="d-flex justify-end">
                        <v-btn
                            color="primary"
                            @click="handleSubmit"
                            :disabled="this.$store.state.addPost.isLoading"
                            >เพิ่มโพสต์</v-btn
                        >
                    </div>
                    <v-progress-linear
                        class="mt-2"
                        indeterminate
                        color="primary"
                        v-show="this.$store.state.addPost.isLoading"
                    ></v-progress-linear>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AddPost',
    data: () => ({
        text: '',
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = state.getInfoClassroom.data.classcode
            if (this.text == '') {
                this.errormessage = 'โปรดเขียนข้อความที่ต้องการโพสต์'
                commit('addPost/addPostFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addPost/addPost', {
                text: this.text,
                classcode,
            })
            if (state.addPost.isSuccess) {
                this.$emit('getPost')
            }
            this.text = ''
            if (state.addPost.isFailed) {
                this.errormessage = state.addPost.message ?? 'ไม่สามารถโพสต์ได้'
            }
        },
    },
}
</script>

<style></style>
