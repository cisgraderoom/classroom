<template>
    <div>
        <v-row
            ><v-col md="9" class="mx-auto" xl="5">
                <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                    <v-textarea label="เพิ่มโพสต์" v-model="text"></v-textarea>
                    <v-alert
                        text
                        type="info"
                        v-show="this.$store.state.addPost.isLoading"
                    >
                        กำลังเพิ่มโพสต์
                    </v-alert>
                    <v-alert
                        text
                        type="error"
                        v-show="this.$store.state.addPost.isFailed"
                    >
                        {{ errormessage }}
                    </v-alert>
                    <div class="d-flex justify-end">
                        <v-btn color="primary" @click="handleSubmit"
                            >เพิ่มโพสต์</v-btn
                        >
                    </div>
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
            const { text } = this
            const classcode = state.getInfoClassroom.data.classcode
            if (text == '') {
                this.errormessage = 'โปรดเขียนข้อความที่ต้องการโพสต์'
                commit('addPost/addPostFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addPost/addPost', {
                text,
                classcode,
            })
            if (state.addPost.isFailed) {
                this.errormessage = state.addPost.message ?? 'ไม่สามารถโพสต์ได้'
            }
        },
    },
}
</script>

<style></style>
