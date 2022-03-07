<template>
    <v-col md="2" offset-md="1" xl="2" offset-xl="2">
        <v-card class="mx-auto" elevation="3">
            <v-list dense>
                <v-subheader class="mx-2">รายการ</v-subheader>
                <v-list-item-group v-model="Page" color="primary" mandatory>
                    <v-list-item value="1" :to="`/classroom/${path}/post`">
                        <v-list-item-icon>
                            <v-icon> mdi-format-align-right </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>โพสต์ทั้งหมด</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item value="2" :to="`/classroom/${path}/problem`">
                        <v-list-item-icon>
                            <v-icon> mdi-clipboard-text-outline </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>โจทย์ทั้งหมด</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        value="3"
                        :to="`/classroom/${path}/addproblem`"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <v-list-item-icon>
                            <v-icon> mdi-plus-box </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>เพิ่มโจทย์</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        value="4"
                        :to="`/classroom/${path}/allscore`"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <v-list-item-icon>
                            <v-icon> mdi-format-list-numbered </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>คะแนนทั้งหมด</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        value="5"
                        :to="`/classroom/${path}/recheck`"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <v-list-item-icon>
                            <v-icon> mdi-clipboard-text-search </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>ตรวจสอบ</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        value="6"
                        :to="`/classroom/${path}/edit`"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    >
                        <v-list-item-icon>
                            <v-icon> mdi-cog </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                >จัดการห้องเรียน</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
export default {
    name: 'MenuClassroom',
    props: ['path'],
    data: () => ({
        Page: 0,
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
}
</script>

<style></style>
