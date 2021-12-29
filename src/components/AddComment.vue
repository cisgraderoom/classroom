<template>
    <div>
        <!-- <v-alert
            text
            type="info"
            v-show="this.$store.state.addComment.isLoading"
        >
            กำลังคอมเมนต์
        </v-alert> -->
        <v-alert
            text
            type="error"
            v-show="this.$store.state.addComment.isFailed"
        >
            {{ errormessage }}
        </v-alert>
        <v-row align="center">
            <v-col cols="9" sm="9" md="9" lg="10" xl="9">
                <v-text-field
                    v-model="text"
                    label="เพิ่มคอมเมนต์"
                    maxlength="500"
                    counter
                    required
                    :disabled="this.$store.state.addComment.isLoading"
                ></v-text-field>
            </v-col>
            <v-col cols="2" md="2">
                <v-btn
                    elevation="2"
                    color="primary"
                    class="mr-1"
                    @click="handleSubmit"
                    :disabled="this.$store.state.addComment.isLoading"
                    >comment</v-btn
                >
            </v-col>
        </v-row>
        <v-progress-linear
            indeterminate
            color="primary"
            v-show="this.$store.state.addComment.isLoading"
        ></v-progress-linear>
    </div>
</template>

<script>
export default {
    name: 'AddComment',
    props: ['postid'],
    data() {
        return {
            text: '',
            submitted: false,
            errormessage: '',
            getpostid: this.postid,
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const { getpostid } = this
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
                commit('addComment/addCommentFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addComment/addComment', {
                text: this.text,
                postid: getpostid,
                classcode,
            })
            if (state.addComment.isSuccess) {
                this.$emit('getComment')
            }
            this.text = ''
            if (state.addComment.isFailed) {
                this.errormessage =
                    state.addComment.message ?? 'ไม่สามารถโพสต์ได้'
            }
        },
    },
}
</script>

<style></style>
