<template>
    <v-hover v-slot="{ hover }">
        <v-card
            class="px-7 py-7 rounded white mb-5"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
            :to="{ path }"
        >
            <v-row align="center">
                <v-col md="1">
                    <v-icon color="deep-orange darken-1" large
                        >mdi-account-circle</v-icon
                    >
                </v-col>
                <v-col>
                    <h3 class="deep-orange--text text--darken-1">{{ who }}</h3>
                    <h5 class="grey--text text--darken-1">
                        {{ dateFormat }}
                    </h5>
                </v-col>
            </v-row>
            <br />
            <p>{{ problemtext }}</p>
        </v-card>
    </v-hover>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
export default {
    name: 'PostProblem',
    props: ['problemid', 'problemtext', 'who', 'date', 'path'],
    data: () => ({
        dateFormat: null,
    }),
    mounted() {
        this.formatDate()
    },
    methods: {
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.dateFormat = timeAgo.format(new Date(this.date))
        },
    },
}
</script>

<style></style>
