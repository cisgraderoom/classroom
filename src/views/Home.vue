<template>
  <div>
    CISClassroom
    <v-text-field
      v-model="firstname"
      :rules="nameRules"
      :counter="10"
      label="First name"
      required
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
