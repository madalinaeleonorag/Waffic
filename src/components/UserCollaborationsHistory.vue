<template>
    <v-container fluid>
            <v-menu
            origin="center center"
            transition="scale-transition"
            bottom>
            <v-btn slot="activator" color="primary" dark>
                Alege utilizator pentru afișarea istoricului colaborărilor
            </v-btn>
            <v-list>
                <v-list-tile v-for="(item, i) in keysUsers" :key="i" @click="index = i">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        class="elevation-1">
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.StartDate }}</td>
          <td class="text-xs-left">{{ props.item.TypesOfCollaboration }}</td>
          <td class="text-xs-left">{{ props.item.DenumireCompanie }}</td>
          <td class="text-xs-left">{{ props.item.DescriereCompanie }}</td>
          <td class="text-xs-left">{{ props.item.CoordonataLatitudine }}</td>
          <td class="text-xs-left">{{ props.item.CoordonataLongitudine }}</td>
        </template>
      </v-data-table>
    </v-container>
</template>



<script>
import firebase from "@/firebase";
export default {
  name: "UserCollaborationsHistory",
  data() {
    return {
      headers: [
        { text: "Data start", align: "left", value: "dataStart" },
        { text: "Tip colaborare", value: "tipColaborare" },
        { text: "Companie", value: "Companie" },
        { text: "Descriere companie", value: "DescriereCompanie" },
        { text: "Coordonata Latitudine", value: "CoordonataLatitudine" },
        { text: "Coordonata Longitudine", value: "CoordonataLongitudine" }
      ],
      items: [],
      index: 0
    };
  },
  computed: {
    keysUsers() {
      return this.$store.getters.keysUsers;
    },
    collaborationsDetails() {
      return firebase
        .database()
        .ref("UserDetails")
        .on(
          "value",
          snap => {
            var myObj = snap.val();
            console.log("myobj:" + myObj);
            var ceva = myObj[this.keysUsers[this.index]].Collaborations;
            console.log("ceva:" + ceva);
            var keysCollaborations = Object.keys(ceva);
            console.log("keyscolab:" + keysCollaborations);
            if (ceva !== null) {
              keysCollaborations.forEach(key2 => {
                var details = {};
                details.StartDate = myObj[this.keysUsers[this.index]].Collaborations[key2].StartDate;
                details.TypesOfCollaboration = myObj[this.keysUsers[this.index]].Collaborations[key2].TypesOfCollaboration;
                details.DenumireCompanie = myObj[this.keysUsers[this.index]].Collaborations[key2].DenumireCompanie;
                details.DescriereCompanie = myObj[this.keysUsers[this.index]].Collaborations[key2].DescriereCompanie;
                details.CoordonataLatitudine = myObj[this.keysUsers[this.index]].Collaborations[key2].CoordonataLatitudine;
                details.CoordonataLongitudine = myObj[this.keysUsers[this.index]].Collaborations[key2].CoordonataLongitudine;
                this.items.push(details);
              });
            } else {
              details.StartDate = "none";
              details.TypesOfCollaboration = "none";
              details.DenumireCompanie = "none";
              details.DescriereCompanie = "none";
              details.CoordonataLatitudine = "none";
              details.CoordonataLongitudine = "none";
              this.items.push(details);
            }
          },
          function(error) {
            console.log("Error: " + error.message);
          }
        );
    }
  }
};
</script>