<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on"
                    ><v-icon>mdi-delete</v-icon></v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">ลบคอมเม้น</span>
                </v-card-title>
                <v-card-text>ต้องการที่จะลบคอมเม้นนี้ใช่หรือไม่</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="dialog = false"
                        :disabled="this.$store.state.deleteComment.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.deleteComment.isLoading"
                    >
                        ใช่
                    </v-btn>
                </v-card-actions>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.deleteComment.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'DeleteComment',
    props: ['comment_id', 'post_id', 'classcode'],

    data() {
        return {
            text: '',
            submitted: false,
            errormessage: '',
            getcomment_id: this.comment_id,
            getpost_id: this.post_id,
            getclasscode: this.classcode,
            dialog: false,
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state } = this.$store
            this.submitted = true
            const { getcomment_id, getpost_id, getclasscode } = this
            await dispatch('deleteComment/deleteComment', {
                post_id: getpost_id,
                comment_id: getcomment_id,
                classcode: getclasscode,
            })
            if (state.deleteComment.isSuccess) {
                this.dialog = false
                this.$emit('getComment')
            }
            this.text = ''
            if (state.deleteComment.isFailed) {
                this.errormessage =
                    state.deleteComment.message ?? 'ไม่สามารถลบคอมเม้นได้'
            }
        },
    },
}
</script>

<style></style>
