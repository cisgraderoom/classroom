<template>
    <div>
        <Navbar />
        <v-container>
            <v-row>
                <v-col md="9" class="mx-auto mt-5" xl="5" elevation="12">
                    <h2 class="my-2">จัดการผู้ใช้งาน</h2>
                </v-col>
            </v-row>
            <v-row>
                <AddAccount />
                <AddAccount />
            </v-row>
            <AllUser />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import AddAccount from '../components/Manage/AddAccount'
import AllUser from '../components/Manage/AllUser'
export default {
    name: 'Manage',
    components: {
        Navbar,
        AddAccount,
        AllUser,
    },
}
</script>

<style></style>
