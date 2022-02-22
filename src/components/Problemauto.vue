<template>
    <v-hover v-slot="{ hover }">
        <v-sheet
            class="px-7 py-7 rounded white mb-5"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
        >
            <v-row align="center">
                <v-col md="1" xl="1">
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
            <v-row align="center">
                <v-col md="10">
                    <v-file-input
                        truncate-length="15"
                        label="File input"
                    ></v-file-input>
                </v-col>
                <v-col md="2">
                    <v-btn elevation="2" color="primary" class="mr-1"
                        >submit</v-btn
                    >
                </v-col>
            </v-row>
        </v-sheet>
    </v-hover>
</template>

<script>
export default {
    name: 'PostProblem',
    props: ['problemid', 'problemtext', 'who', 'date'],
    data: () => ({}),
}
</script>

<style></style>
