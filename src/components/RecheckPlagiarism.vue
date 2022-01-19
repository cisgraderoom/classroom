<template>
    <div>
        <v-row>
            <v-col md="9" class="mx-auto" xl="5">
                <h2 class="my-2">ตรวจใหม่ & ตรวจความคล้ายคลึง</h2>
                <AddRecheckPlagiarism class="my-2 mx-1" />
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="9" class="mx-auto mb-10" xl="5">
                    <v-select
                        md="4"
                        xl="5"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                        v-model="problem"
                        label="โจทย์ที่ตรวจความคล้ายคลึงแล้ว"
                    >
                    </v-select>
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :items-per-page="5"
                        hide-default-footer
                        class="elevation-1"
                    ></v-data-table>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import AddRecheckPlagiarism from './AddRecheckPlagiarism'
export default {
    name: 'RecheckPlagiarism',
    components: {
        AddRecheckPlagiarism,
    },
    data() {
        return {
            problem: null,
            headers: [
                { text: 'Username1', value: 'calories' },
                { text: 'Username2', value: 'fat' },
                { text: 'Result', value: 'carbs' },
                { text: 'ดูผลลัพท์', sortable: false, value: 'protein' },
            ],
            desserts: [
                {
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ],
        }
    },
}
</script>

<style></style>
