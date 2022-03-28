<template>
    <div>
        <v-row class="mx-auto align-center">
            <v-col>
                <v-text-field
                    v-model="text"
                    label="เพิ่มคอมเมนต์"
                    maxlength="500"
                    counter
                    v-on:keyup.enter="handleSubmit"
                    :disabled="isLoading || loading"
                ></v-text-field>
            </v-col>
            <v-col cols="auto">
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
        <v-alert
            text
            type="error"
            v-show="this.$store.state.addComment.isFailed"
        >
            {{ errormessage }}
        </v-alert>
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
                setTimeout(
                    () =>
                        commit('addComment/addCommentFailure', {
                            isFailed: false,
                            isLoading: false,
                            isSuccess: false,
                        }),
                    3000
                )
                this.isLoading = false
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
                setTimeout(
                    () =>
                        commit('addComment/addCommentFailure', {
                            isFailed: false,
                            isLoading: false,
                            isSuccess: false,
                        }),
                    3000
                )
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
                setTimeout(
                    () =>
                        commit('addComment/addCommentFailure', {
                            isFailed: false,
                            isLoading: false,
                            isSuccess: false,
                        }),
                    3000
                )
            }
        },
    },
}
</script>

<style></style>
