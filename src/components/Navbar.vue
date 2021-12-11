<template>
    <v-app-bar app color="#FFFFFF">
        <div>
            <v-img
                alt="CISClassroom Logo"
                src="../assets/ciskmutnb.png"
                width="50"
                class="ml-15 cislogo"
                @click="toHome"
            />
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-title class="mr-2 subtitle">{{ userName }}</v-toolbar-title>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="mr-15">
                    <v-icon large>mdi-account-circle</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item link to="/editaccount">
                    <v-list-item-title>แก้ไขผู้ใช้</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout">
                    <v-list-item-title>ออกจากระบบ</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name: 'Navbar',
    data: () => ({
        userName: JSON.parse(localStorage.getItem('user'))?.name,
    }),
    methods: {
        toHome() {
            this.$router.push('/list')
        },
        logout() {
            this.$store.dispatch('authentication/logout')
            this.$router.push('/')
        },
    },
}
</script>

<style scoped>
.cislogo {
    cursor: pointer;
}
</style>
