<template>
    <div class="pt-3">
        <div v-if="isNotInConfig()">
            <v-row class="d-flex justify-center">
                <v-col cols="10">
                    <v-text-field label="Óra neve" outlined dark v-model="newItem" @keyup.enter="addItem"></v-text-field>
                    <v-text-field label="Óra ídőtartama" outlined dark v-model="newTimestamp" @keyup.enter="addItem"></v-text-field>
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
            <v-card class="mx-auto pa-3 ma-2 text-center" max-width="350" v-for="room in rooms" :key="room.id" color="#262626" dark>
                <v-row align-content="center">
                    <v-col align-self="center">
                        <v-list-item-title class="headline mb-1">{{ room.name }}</v-list-item-title>
                        <v-list-item-subtitle class="sub">{{ room.time }}</v-list-item-subtitle>
                        <div class="invis">-</div>
                        <v-btn color="green" @click="analyticsLog(room.name, room.link)">Belépés</v-btn>
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
            newTimestamp: "",
        }
    },
    methods: {
        async addItem() {
            if(this.newItem) {
                await db.collection("classes").add({ name: this.newItem, link: this.newLink, time: this.newTimestamp });
                this.newItem = "";
                this.newLink = "";
                this.newTimestamp = "";
            }
        },
        async analyticsLog(name, link) {
            open(link);
            await db.collection("analytics").add({ name: name, link: link });
        },
        deleteRoom(id) {
            db.collection("classes").doc(id).delete();
        },
        isNotInConfig() {
            //true if admin mode
            return false;
        }
    },
    firestore: {
        rooms: db.collection("classes")
    }
}
</script>

<style lang="scss">
.sub {
    color: rgb(105, 105, 105);
};

.invis {
    color: rgba(0, 0, 0, 0);
    height: 10px;
    padding: center;
};
</style>
