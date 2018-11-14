<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="secondary" flat outline>Recuperar senha</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Recuperar Senha</span>
        </v-card-title>
        <v-card-text>
              <v-flex xs12>
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat outline @click="fecharDialog">Fechar</v-btn>
          <v-btn color="primary" @click="recuperarSenha" :loading="submitted">Recuperar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      dialog: false,
      submitted: false
    };
  },
  methods: {
    fecharDialog() {
      this.dialog = false;
      this.submitted = false;
    },
    recuperarSenha() {
      this.submitted = true;
    }
  }
};
</script>

<style scoped>
v-text-field {
  margin: 20px;
}
</style>
