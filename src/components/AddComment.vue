<template>
    <div>
        <v-alert text type="error" v-show="error">
            {{ errormessage }}
        </v-alert>
        <v-row class="mx-auto" align="center">
            <v-col cols="9" sm="8" md="9" lg="9" xl="10">
                <v-text-field
                    v-model="text"
                    label="เพิ่มคอมเมนต์"
                    maxlength="500"
                    counter
                    v-on:keyup.enter="handleSubmit"
                    :disabled="isLoading || loading"
                ></v-text-field>
            </v-col>
            <v-col cols="2" md="2">
                <v-btn
                    elevation="2"
                    color="primary"
                    class="mr-1"
                    @click="handleSubmit"
                    :disabled="isLoading || loading"
                    >comment</v-btn
                >
            </v-col>
        </v-row>
        <v-progress-linear
            indeterminate
            color="primary"
            v-show="isLoading"
        ></v-progress-linear>
    </div>
</template>

<script>
export default {
    name: 'AddComment',
    props: ['postid', 'loading'],
    data() {
        return {
            text: '',
            submitted: false,
            error: false,
            errormessage: '',
            isLoading: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const { postid } = this
            if (this.text == '') {
                this.errormessage = 'โปรดเขียนข้อความที่ต้องการคอมเม้น'
                commit('addComment/addCommentFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (this.text.length < 5) {
                this.errormessage = 'คอมเม้นอย่างน้อย 5 ตัวอักษร'
                this.error = true
                commit('addComment/addCommentFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                this.isLoading = false
                return
            }
            await dispatch('addComment/addComment', {
                text: this.text,
                postid,
                classcode,
            })
            if (state.addComment.isSuccess) {
                this.$emit('getComment')
                this.isLoading = false
                this.error = false
            }
            this.text = ''
            if (state.addComment.isFailed) {
                this.errormessage =
                    state.addComment.message ?? 'ไม่สามารถโพสต์ได้'
                this.isLoading = false
                this.error = true
            }
        },
    },
}
</script>

<style></style>
