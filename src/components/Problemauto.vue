<template>
    <v-hover v-slot="{ hover }">
        <v-sheet
            class="px-7 py-7 rounded white mb-5"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
        >
            <v-row align="center">
                <v-col>
                    <h3>{{ problemname }}</h3>
                </v-col>
                <v-col cols="auto">
                    <!-- <v-chip v-show="!status"> ยังไม่ส่ง </v-chip>
                    <v-chip color="green" text-color="white" v-show="status">
                        ส่งแล้ว
                    </v-chip> -->
                    <v-chip v-if="maxscore"> คะแนนเต็ม {{ maxscore }} </v-chip>
                </v-col>
            </v-row>
            <p>
                {{ problemtext }}
            </p>
            <h5 class="grey--text text--darken-1" v-if="opendate">
                Open {{ opendate }}
            </h5>
            <h5 class="grey--text text--darken-1" v-if="closedate">
                Close {{ closedate }}
            </h5>
            <v-progress-linear
                indeterminate
                color="primary"
                v-show="$store.state.getByIdProblem.isLoading"
            ></v-progress-linear>
            <SubmitProblem :problemid="problemid" />
            <!-- <v-row align="center">
                <v-col>
                    <v-file-input
                        truncate-length="15"
                        label="File input"
                        v-show="!$store.state.getByIdProblem.isLoading"
                    ></v-file-input>
                </v-col>
                <v-col cols="auto">
                    <v-btn
                        elevation="2"
                        color="primary"
                        class="mr-1"
                        v-show="!$store.state.getByIdProblem.isLoading"
                        >submit</v-btn
                    >
                </v-col>
            </v-row> -->
        </v-sheet>
    </v-hover>
</template>

<script>
import SubmitProblem from './SubmitProblem'
export default {
    name: 'Problemauto',
    components: {
        SubmitProblem,
    },
    props: [
        'problemid',
        'problemname',
        'problemtext',
        'who',
        'opendate',
        'closedate',
        'maxscore',
    ],
    data: () => ({
        status: false,
    }),
}
</script>

<style></style>
