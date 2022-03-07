<template>
    <div>
        <Navbar />
        <v-container>
            <HeadClassroom />
            <v-row>
                <MenuClassroom :path="$route.params.code" />
                <v-col md="9" xl="8">
                    <AllScore />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import MenuClassroom from '../../components/MenuClassroom'
import AllScore from '../../components/AllScore'
export default {
    name: 'ClassroomAllScore',
    components: {
        Navbar,
        HeadClassroom,
        MenuClassroom,
        AllScore,
    },
    data: () => ({
        thisPage: 4,
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
    }),
}
</script>

<style>
.btn-toggle {
    flex-direction: column;
}
.v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 17px;
}
</style>
