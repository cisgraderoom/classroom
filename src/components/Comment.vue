<template>
    <div>
        <v-row align="top">
            <v-col sm="1" md="1" lg="1" xl="1">
                <v-icon large>mdi-account-circle</v-icon>
            </v-col>
            <v-col md="11">
                <h5>เด็กตาดำๆ</h5>
                <p>
                    ทำไมไก่ไข่เกิดมาแล้วว้าวซ่า
                    <!-- {{ posttext }} -->
                </p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: ['getpostid', 'posttext', 'who', 'date'],

    data() {
        return {
            comment: '',
        }
    },
}
</script>

<style></style>
