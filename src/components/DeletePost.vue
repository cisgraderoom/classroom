<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on"
                    >ลบโพสต์</v-list-item-title
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">ลบโพสต์</span>
                </v-card-title>
                <v-card-text>ต้องการที่จะลบโพสต์นี้ใช่หรือไม่</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="dialog = false"
                        :disabled="this.$store.state.deletePost.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.deletePost.isLoading"
                    >
                        ใช่
                    </v-btn>
                </v-card-actions>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.deletePost.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'DeletePost',
    props: ['post_id', 'class_code'],

    data() {
        return {
            submitted: false,
            errormessage: '',
            dialog: false,
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state } = this.$store
            this.submitted = true
            const { post_id, class_code } = this
            await dispatch('deletePost/deletePost', {
                post_id,
                classcode: class_code,
            })
            if (state.deletePost.isSuccess) {
                this.dialog = false
                this.$emit('getPost')
            }
            if (state.deletePost.isFailed) {
                this.errormessage =
                    state.deletePost.message ?? 'ไม่สามารถลบโพสต์'
            }
        },
    },
}
</script>

<style></style>
