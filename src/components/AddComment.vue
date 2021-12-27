<template>
    <div>
        <v-row align="center">
            <v-col sm="9" md="9" lg="10" xl="9">
                <v-text-field
                    v-model="comment"
                    label="เพิ่มคอมเมนต์"
                    required
                ></v-text-field>
            </v-col>
            <v-col md="2">
                <v-btn elevation="2" color="primary" class="mr-1"
                    >comment</v-btn
                >
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'AddComment',
    props: ['getpostid'],
    data() {
        return {
            comment: '',
        }
    },
}
</script>

<style></style>
