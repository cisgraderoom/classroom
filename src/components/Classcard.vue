<template>
    <v-hover v-slot="{ hover }">
        <v-card
            router-link
            :to="`/classroom/${path}`"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
        >
            <v-img
                lazy-src="/cis.webp"
                src="/cis.webp"
                height="120px"
                class="white--text align-end"
                ><v-card-title
                    class="d-inline-block text-truncate"
                    v-text="title"
                    style="max-width: 100%"
                ></v-card-title
            ></v-img>
            <v-card-subtitle>
                ตอนเรียน : {{ section }} <br />
                {{ teacher }}</v-card-subtitle
            >
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: 'Classcard',
    props: ['title', 'section', 'teacher', 'path'],
    data: () => ({
        menu: [
            { title: 'Edit', route: '/' },
            { title: 'Delete', route: '/' },
        ],
    }),
}
</script>

<style></style>
