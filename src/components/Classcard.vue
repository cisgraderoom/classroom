<template>
    <v-hover v-slot="{ hover }">
        <v-card
            router-link
            :to="`/classroom/${path}`"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 5 : 2"
        >
            <v-img src="/cis.webp" height="120px" class="white--text align-end"
                ><v-card-title
                    class="d-inline-block text-truncate"
                    v-text="title"
                    style="max-width: 100%"
                ></v-card-title
            ></v-img>
            <!-- <v-card-title> {{ title }} </v-card-title> -->
            <v-card-subtitle>
                ตอนเรียน : {{ section }} <br />
                {{ teacher }}</v-card-subtitle
            >
            <!-- <v-card-subtitle> {{ teacher }} </v-card-subtitle> -->
            <!-- <v-card-actions> -->
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(menu, index) in menu"
              :key="index"
              :to="menu.route"
            >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
            <!-- </v-card-actions> -->
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
