<template>
    <div class="pt-3">
        <div v-if="isNotInConfig()">
            <v-row class="d-flex justify-center">
                <v-col cols="10">
                    <v-text-field label="Óra neve" outlined dark v-model="newItem" @keyup.enter="addItem"></v-text-field>
                    <v-text-field label="Link a belépéshez" outlined dark v-model="newLink" @keyup.enter="addItem"></v-text-field>
                </v-col>
            </v-row>
            <v-row align-content="center" class="d-flex justify-center">
                <v-btn large color="primary" @click="addItem">online óra regisztrálása</v-btn>
            </v-row>
        </div>
        <v-row>
            <h1>-</h1>
        </v-row>
        <transition-group name="fade">
            <v-card class="mx-auto pa-3 ma-2 text-center" max-width="600" v-for="room in rooms" :key="room.id" color="#262626" dark>
                <v-row align-content="center">
                    <v-col align-self="center">
                        <v-list-item-title class="headline mb-1">{{ room.name }}</v-list-item-title>
                        <a :href="room.link">{{ room.link }}</a>
                    </v-col>
                </v-row>
            </v-card>
        </transition-group>
    </div>
</template>

<script>
import { db } from '../firebase/db'
export default {
    data() {
        return {
            rooms: [],
            newItem: "",
            newLink: "",
        }
    },
    methods: {
        async addItem() {
            if(this.newItem) {
                await db.collection("classes").add({ name: this.newItem, link: this.newLink });
                this.newItem = "";
                this.newLink = "";
            }
        },
        deleteRoom(id) {
            db.collection("classes").doc(id).delete();
        },
        isNotInConfig() {
            //true if admin mode
            return true;
        }
    },
    firestore: {
        rooms: db.collection("classes")
    }
}
</script>