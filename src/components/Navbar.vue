<template>
    <v-app-bar app color="#FFFFFF">
        <!-- <div class="d-flex align-center" to="/Index">
      <v-img
        alt="CISClassroom Logo"
        class="shrink mr-2 ml-2"
        contain
        src="../assets/ciskmutnb.png"
        transition="scale-transition"
        width="45"
      />
    </div> -->
        <v-btn icon plain to="/index" class="ml-15">
            <v-img
                alt="CISClassroom Logo"
                class="shrink"
                contain
                src="../assets/ciskmutnb.png"
                transition="scale-transition"
                width="45"
            />
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn hidden icon v-bind="attrs" v-on="on" plain to="/notifiacation">
      <v-icon>mdi-bell</v-icon>
    </v-btn> -->
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
        logout() {
            this.$store.dispatch('authentication/logout')
            this.$router.push('/')
        },
    },
}
</script>

<style></style>
