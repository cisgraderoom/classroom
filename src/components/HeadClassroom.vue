<template>
    <div>
        <v-row>
            <v-col md="10" offset-md="1" xl="6" offset-xl="3">
                <v-sheet class="px-12 py-10 rounded white mt-10" elevation="4">
                    <h1>{{ classname }}</h1>
                    <caption>
                        {{
                            section
                        }}
                    </caption>
                    <br />
                    <caption>
                        {{
                            nametecher
                        }}
                    </caption>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'HeadClassroom',
    props: ['classname', 'section', 'nametecher'],
}
</script>

<style></style>
