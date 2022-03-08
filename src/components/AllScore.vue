<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">คะแนนทั้งหมด</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" class="mb-10" xl="9">
                    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="5"
                            hide-default-footer
                            :loading="
                                this.$store.state.listAllScoreInClass.isLoading
                            "
                            v-show="
                                !this.$store.state.listAllScoreInClass.isFailed
                            "
                            loading-text="กำลังโหลด...."
                            class="elevation-1"
                        >
                        </v-data-table>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="
                                this.$store.state.listAllScoreInClass.isLoading
                            "
                        ></v-progress-linear>
                        <v-alert
                            text
                            type="error"
                            v-show="
                                this.$store.state.listAllScoreInClass.isFailed
                            "
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AllScore',
    mounted() {
        this.listAllScore()
    },
    data() {
        return {
            listScore: [],
            errormessage: null,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Username', value: 'calories' },
                { text: 'Password', value: 'fat' },
                { text: 'Role', value: 'carbs' },
                { text: 'Status', value: 'protein' },
                { text: 'Manage', value: 'iron' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        }
    },
    methods: {
        async listAllScore() {
            const classcode = this.$route.params.code
            const { dispatch, state } = this.$store
            await dispatch('listAllScoreInClass/listAllScoreInClass', {
                classcode,
            }).then(() => {
                this.listScore = state.listAllScoreInClass.listScore
            })
            if (state.listAllScoreInClass.isFailed) {
                this.errormessage =
                    state.listAllScoreInClass.message ??
                    'ไม่สามารถโหลดข้อมูลได้'
            }
        },
    },
}
</script>

<style></style>
