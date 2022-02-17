<template>
    <div>
        <v-row>
            <v-col md="10" xl="9" elevation="12">
                <h2 class="my-2">โพสต์ทั้งหมด</h2>
            </v-col>
        </v-row>
        <ListPost />
    </div>
</template>

<script>
import ListPost from './ListPost'
export default {
    name: 'AllPost',
    components: {
        ListPost,
    },
    data: () => ({
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
}
</script>

<style></style>
