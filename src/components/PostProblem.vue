<template>
    <v-hover v-slot="{ hover }">
        <v-card
            class="px-7 py-7 rounded white mb-5"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
            :to="{ path }"
        >
            <v-row align="center">
                <v-col>
                    <h3>{{ problemname }}</h3>
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    <v-chip
                        color="red"
                        text-color="white"
                        v-show="nowdate > closedate"
                        class="mx-2"
                    >
                        ปิดการส่งแล้ว
                    </v-chip>
                    <v-chip> คะแนนเต็ม {{ maxscore }} </v-chip>
                </v-col>
            </v-row>
            <p>
                {{ problemtext }}
            </p>
            <v-row align="center">
                <v-col>
                    <h5 class="grey--text text--darken-1">
                        Open {{ openDateFormat }}
                    </h5>
                    <h5 class="grey--text text--darken-1">
                        Close {{ closeDateFormat }}
                    </h5>
                </v-col>
                <!-- <v-col cols="auto">
                    <v-chip> คะแนนเต็ม {{ maxscore }} </v-chip>
                </v-col> -->
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
export default {
    name: 'PostProblem',
    props: [
        'problemid',
        'problemname',
        'problemtext',
        'who',
        'opendate',
        'closedate',
        'path',
        'maxscore',
    ],
    data: () => ({
        openDateFormat: null,
        closeDateFormat: null,
        nowdate:
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10) +
            ' ' +
            new Date().getHours() +
            ':' +
            new Date().getMinutes(),
    }),
    mounted() {
        this.formatDate()
    },
    methods: {
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.openDateFormat = timeAgo.format(new Date(this.opendate))
            this.closeDateFormat = timeAgo.format(new Date(this.closedate))
        },
    },
}
</script>

<style></style>
