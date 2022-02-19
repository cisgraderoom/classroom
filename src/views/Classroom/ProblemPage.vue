<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom
                :classname="classroom.classname"
                :section="classroom.section"
                :nametecher="classroom.nametecher"
            />

            <div>
                <v-row>
                    <v-col md="9" class="mx-auto" xl="7">
                        <h2 class="my-2">โจทย์</h2>
                    </v-col>
                </v-row>
            </div>
            <div>
                <v-row
                    ><v-col md="9" class="mx-auto" xl="7"
                        ><Problemauto
                            :problemid="problem.problemid"
                            :problemtext="problem.problemtext"
                            :who="problem.who"
                            :date="problem.date"
                        />
                    </v-col>
                </v-row>
            </div>

            <v-row>
                <v-col md="9" class="mx-auto" xl="7">
                    <v-data-table
                        :headers="headers"
                        :items="score"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import Problemauto from '../../components/Problemauto'
export default {
    name: 'Problem',
    components: {
        Navbar,
        HeadClassroom,
        Problemauto,
    },
    data: () => ({
        classroom: {
            classname: 'Classroom',
            section: 'Section',
            nametecher: 'Nametecher',
        },
        problem: {
            problemid: '1',
            problemtext:
                'กล่องปริศนาใบนี้บรรจุสิ่งต่าง ๆ ไว้มากมาย กล่องใบนี้จะมีอะไรบ้าง',
            who: 'ธนภัทร์ อนุศาสน์อมรกุล',
            date: '01/01/2021',
        },
        headers: [
            {
                text: 'Date',
                align: 'start',
                sortable: false,
                value: 'date',
            },
            { text: 'case1', value: 'case1' },
            { text: 'case2', value: 'case2' },
            { text: 'case3', value: 'case3' },
            { text: 'case4', value: 'case4' },
            { text: 'case5', value: 'case5' },
            { text: 'sum', value: 'sum' },
        ],
        score: [
            {
                date: '01/01/2021',
                case1: 0,
                case2: 0,
                case3: 0,
                case4: 0,
                case5: 0,
                sum: '0',
            },
        ],
    }),
}
</script>
