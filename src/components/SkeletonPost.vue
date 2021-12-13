<template>
    <div>
        <v-row class="mt-0 mb-10">
            <v-col md="9" class="mx-auto" xl="5">
                <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-avatar-three-line, article"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row class="mt-0 mb-10">
            <v-col md="9" class="mx-auto" xl="5">
                <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-avatar-three-line, article"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'SkeletonPost',
}
</script>
