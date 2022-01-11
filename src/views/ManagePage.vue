<template>
    <div>
        <Navbar />
        <v-container>
            <v-row>
                <v-col md="12" class="mx-auto mt-5" xl="10" elevation="12">
                    <h2 class="my-2">จัดการผู้ใช้งาน</h2>
                </v-col>
            </v-row>
            <v-row>
                <AddAccount />
                <AddAccountManual />
            </v-row>
            <AllUser />
        </v-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import AddAccount from '../components/Manage/AddAccount'
import AddAccountManual from '../components/Manage/AddAccountManual'
import AllUser from '../components/Manage/AllUser'
export default {
    name: 'Manage',
    components: {
        Navbar,
        AddAccount,
        AddAccountManual,
        AllUser,
    },
}
</script>

<style></style>
