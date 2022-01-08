<template>
    <v-row
        ><v-col md="9" class="mx-auto" xl="5">
            <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                <v-col>
                    <h3>ผู้ใช้งานทั้งหมด</h3>
                </v-col>

                <br />
                <v-data-table
                    :headers="headers"
                    :items="listuser"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    class="elevation-1"
                    @page-count="pageCount = $event"
                ></v-data-table>
                <div class="text-center pt-2">
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                    ></v-pagination>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'AllUser',
    mounted() {
        this.getListUser()
    },
    data() {
        return {
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            headers: [
                {
                    text: 'ชื่อ',
                    align: 'start',
                    value: 'name',
                },
                { text: 'Username', value: 'username' },
                { text: 'role', value: 'role' },
                { text: 'status', value: 'status' },
                { text: 'created_at', value: 'created_at' },
                { text: 'update_at', value: 'update_at' },
            ],
            listuser: [],
        }
    },
    methods: {
        getListUser() {
            let data = this.$store
                .dispatch('listAllUser/listAllUser')
                .then(() => {
                    this.listuser = this.$store.state.listAllUser.listUser
                    this.hasNext = this.$store.state.listPost.hasNext
                    this.upDateKey += 1
                })
            return data
        },
    },
}
</script>

<style></style>
