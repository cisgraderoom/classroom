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
                    <v-chip
                        color="red"
                        text-color="white"
                        v-show="!isopen"
                        class="mx-2"
                    >
                        ปิดการส่งแล้ว
                    </v-chip>
                    <v-chip v-if="maxscore"> คะแนนเต็ม {{ maxscore }} </v-chip>
                </v-col>
            </v-row>
            <p>{{ problemtext }}</p>
            <a @click="DownloadFile">
                {{ assetname }}
            </a>
            <h5 class="grey--text text--darken-1 mt-2" v-if="opendate">
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
            <SubmitProblem
                :problemid="problemid"
                v-show="checkRoleClassroom == 'student'"
                @getsubmitTable="getsubmitTable"
            />
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
        'isopen',
        'asset',
    ],
    mounted() {
        if (this.asset) {
            this.assetname = this.asset.substring(this.asset.indexOf('_') + 1)
        }
    },
    data: () => ({
        status: false,
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
        assetname: null,
    }),
    methods: {
        getsubmitTable() {
            this.$emit('getsubmitTable')
        },
        DownloadFile() {
            // var fileURL = window.URL.createObjectURL(new Blob([this.asset]))
            // var fileLink = document.createElement('a')
            // fileLink.href = fileURL
            // fileLink.setAttribute('download', this.assetname)
            // document.body.appendChild(fileLink)
            // console.log(fileLink)
            // fileLink.click()
            console.log(this.asset)
        },
    },
}
</script>

<style></style>
