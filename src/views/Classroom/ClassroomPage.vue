<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom />
            <v-row>
                <MenuClassroom :path="$route.params.code" />
                <!-- <v-col md="2" offset-md="1" xl="2" offset-xl="2">
                    <v-card class="mx-auto" elevation="3">
                        <v-list dense>
                            <v-subheader class="mx-2">รายการ</v-subheader>
                            <v-list-item-group
                                v-model="thisPage"
                                color="primary"
                                mandatory
                            >
                                <v-list-item
                                    value="0"
                                    :disabled="this.thisPage == 0"
                                >
                                    <v-list-item-icon>
                                        <v-icon>
                                            mdi-format-align-right
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >โพสต์ทั้งหมด</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    value="1"
                                    :disabled="this.thisPage == 1"
                                >
                                    <v-list-item-icon>
                                        <v-icon>
                                            mdi-clipboard-text-outline
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >โจทย์ทั้งหมด</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    value="2"
                                    :disabled="this.thisPage == 2"
                                    v-show="
                                        checkRoleClassroom == 'superteacher' ||
                                        checkRoleClassroom == 'teacher'
                                    "
                                >
                                    <v-list-item-icon>
                                        <v-icon> mdi-plus-box </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >เพิ่มโจทย์</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    value="3"
                                    :disabled="this.thisPage == 3"
                                    v-show="
                                        checkRoleClassroom == 'superteacher' ||
                                        checkRoleClassroom == 'teacher'
                                    "
                                >
                                    <v-list-item-icon>
                                        <v-icon>
                                            mdi-format-list-numbered
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >คะแนนทั้งหมด</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    value="4"
                                    :disabled="this.thisPage == 4"
                                    v-show="
                                        checkRoleClassroom == 'superteacher' ||
                                        checkRoleClassroom == 'teacher'
                                    "
                                >
                                    <v-list-item-icon>
                                        <v-icon>
                                            mdi-clipboard-text-search
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >ตรวจสอบ</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    value="5"
                                    :disabled="this.thisPage == 5"
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
                </v-col> -->
                <v-col md="9" xl="8">
                    <AllPost />
                    <!-- <AllProblem v-if="thisPage == 1" />
                    <AddProblem
                        v-if="
                            thisPage == 2 &&
                            (checkRoleClassroom == 'superteacher' ||
                                checkRoleClassroom == 'teacher')
                        "
                    />
                    <AllScore
                        v-if="
                            thisPage == 3 &&
                            (checkRoleClassroom == 'superteacher' ||
                                checkRoleClassroom == 'teacher')
                        "
                    />
                    <RecheckPlagiarism
                        v-if="
                            thisPage == 4 &&
                            (checkRoleClassroom == 'superteacher' ||
                                checkRoleClassroom == 'teacher')
                        "
                    />
                    <EditClassroom
                        v-if="
                            thisPage == 5 &&
                            (checkRoleClassroom == 'superteacher' ||
                                checkRoleClassroom == 'teacher')
                        "
                    /> -->
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import MenuClassroom from '../../components/MenuClassroom'
import AllPost from '../../components/AllPost'
// import AllProblem from '../../components/AllProblem'
// import AddProblem from '../../components/AddProblem'
// import AllScore from '../../components/AllScore'
// import RecheckPlagiarism from '../../components/RecheckPlagiarism'
// import EditClassroom from '../../components/EditClassroom'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        MenuClassroom,
        AllPost,
        // AllProblem,
        // AddProblem,
        // AllScore,
        // RecheckPlagiarism,
        // EditClassroom,
    },
    data: () => ({
        thisPage: 1,
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
}
</script>

<style>
.btn-toggle {
    flex-direction: column;
}
.v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 17px;
}
</style>
