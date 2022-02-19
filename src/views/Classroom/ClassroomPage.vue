<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom />
            <v-row>
                <v-col md="2" offset-md="1" xl="2" offset-xl="2">
                    <!-- <v-btn
                        elevation="2"
                        color="primary"
                        class="mb-1"
                        block
                        @click="changePage(1)"
                        :disabled="this.thisPage == 1"
                        >โพสต์ทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="primary"
                        class="mb-1"
                        block
                        @click="changePage(2)"
                        :disabled="this.thisPage == 2"
                        >โจทย์ทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="success"
                        class="mb-1"
                        block
                        @click="changePage(3)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 3"
                        >เพิ่มโจทย์</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="secondary"
                        class="mb-1"
                        block
                        @click="changePage(4)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 4"
                        >คะแนนทั้งหมด</v-btn
                    >
                    <v-btn
                        elevation="2"
                        color="secondary"
                        class="mb-1"
                        block
                        @click="changePage(5)"
                        v-show="
                            checkAddClassroom == 'superteacher' ||
                            checkAddClassroom == 'teacher'
                        "
                        :disabled="this.thisPage == 5"
                        >ตรวจสอบใหม่</v-btn
                    > -->
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
                                        checkAddClassroom == 'superteacher' ||
                                        checkAddClassroom == 'teacher'
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
                                        checkAddClassroom == 'superteacher' ||
                                        checkAddClassroom == 'teacher'
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
                                        checkAddClassroom == 'superteacher' ||
                                        checkAddClassroom == 'teacher'
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
                                        checkAddClassroom == 'superteacher' ||
                                        checkAddClassroom == 'teacher'
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
                    <!-- <v-card class="rounded" elevation="3">
                        <h4 class="my-3 mx-3">รายการ</h4>
                        <v-btn-toggle
                            class="btn-toggle"
                            v-model="thisPage"
                            tile
                            mandatory
                            color="primary"
                            group
                        >
                            <v-btn value="1">
                                <v-icon left> mdi-format-align-right </v-icon>
                                <span class="hidden-sm-and-down"
                                    >โพสต์ทั้งหมด</span
                                >
                            </v-btn>
                            <v-btn value="2">
                                <v-icon left>
                                    mdi-clipboard-text-outline
                                </v-icon>
                                <span class="hidden-sm-and-down"
                                    >โจทย์ทั้งหมด</span
                                ></v-btn
                            >
                            <v-btn value="3">
                                <v-icon left> mdi-plus-box </v-icon>
                                <span class="hidden-sm-and-down"
                                    >เพิ่มโจทย์</span
                                ></v-btn
                            >
                            <v-btn value="4">
                                <v-icon left> mdi-format-list-numbered </v-icon>
                                <span class="hidden-sm-and-down"
                                    >คะแนนทั้งหมด</span
                                ></v-btn
                            >
                            <v-btn value="5">
                                <v-icon left>
                                    mdi-clipboard-text-search
                                </v-icon>
                                <span class="hidden-sm-and-down"
                                    >ตรวจสอบใหม่</span
                                >
                            </v-btn>
                        </v-btn-toggle>
                    </v-card> -->
                </v-col>
                <v-col md="9" xl="8">
                    <AllPost v-show="thisPage == 0" />
                    <AllProblem v-show="thisPage == 1" />
                    <AddProblem
                        v-show="
                            thisPage == 2 &&
                            (checkAddClassroom == 'superteacher' ||
                                checkAddClassroom == 'teacher')
                        "
                    />
                    <AllScore
                        v-show="
                            thisPage == 3 &&
                            (checkAddClassroom == 'superteacher' ||
                                checkAddClassroom == 'teacher')
                        "
                    />
                    <RecheckPlagiarism
                        v-show="
                            thisPage == 4 &&
                            (checkAddClassroom == 'superteacher' ||
                                checkAddClassroom == 'teacher')
                        "
                    />
                    <EditClassroom
                        v-show="
                            thisPage == 5 &&
                            (checkAddClassroom == 'superteacher' ||
                                checkAddClassroom == 'teacher')
                        "
                    />
                </v-col>
            </v-row>
            <!-- <AllPost v-show="thisPage == 1" /> -->
            <!-- <AllProblem v-show="thisPage == 2" />
            <AddProblem v-show="thisPage == 3" />
            <AllScore v-show="thisPage == 4" />
            <RecheckPlagiarism v-show="thisPage == 5" /> -->
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import AllPost from '../../components/AllPost'
import AllProblem from '../../components/AllProblem'
import AddProblem from '../../components/AddProblem'
import AllScore from '../../components/AllScore'
import RecheckPlagiarism from '../../components/RecheckPlagiarism'
import EditClassroom from '../../components/EditClassroom'
export default {
    name: 'Classroom',
    components: {
        Navbar,
        HeadClassroom,
        AllPost,
        AllProblem,
        AddProblem,
        AllScore,
        RecheckPlagiarism,
        EditClassroom,
    },
    data: () => ({
        thisPage: 1,
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
    // methods: {
    //     changePage(page) {
    //         console.log(page)
    //         this.thisPage = page
    //     },
    // },
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
