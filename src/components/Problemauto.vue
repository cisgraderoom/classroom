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
                    <v-chip> คะแนนเต็ม {{ maxscore }} </v-chip>
                </v-col>
            </v-row>
            <p>
                {{ problemtext }}
            </p>
            <h5 class="grey--text text--darken-1">
                Open : {{ openDateFormat }}
            </h5>
            <h5 class="grey--text text--darken-1">
                Close : {{ closeDateFormat }}
            </h5>
            <v-row align="center">
                <v-col>
                    <v-file-input
                        truncate-length="15"
                        label="File input"
                    ></v-file-input>
                </v-col>
                <v-col cols="auto">
                    <v-btn elevation="2" color="primary" class="mr-1"
                        >submit</v-btn
                    >
                </v-col>
            </v-row>
        </v-sheet>
    </v-hover>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
export default {
    name: 'Problemauto',
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
        openDateFormat: null,
        closeDateFormat: null,
        status: false,
    }),
    mounted() {
        this.formatDate()
    },
    methods: {
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.openDateFormat = timeAgo.format(new Date(this.opendate))
            this.closeDateFormat = timeAgo.format(new Date(this.closedate))
            console.log(this.openDateFormat)
        },
    },
}
</script>

<style></style>
