<template>
    <div class="pt-3 frhurehgtr">
        <div v-if="isNotInConfig()">
            <v-row class="d-flex justify-center">
                <v-col cols="10">
                    <v-text-field label="Óra neve" outlined dark v-model="newItem" @keyup.enter="addItem"></v-text-field>
                    <v-text-field label="Óra ídőtartama" outlined dark v-model="newTimestamp" @keyup.enter="addItem"></v-text-field>
                    <v-text-field label="Óra sorszáma" outlined dark v-model="newSerial" @keyup.enter="addItem"></v-text-field>
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
            <v-card class="mx-auto pa-3 ma-2" max-width="350" max-height="130" v-for="room in rooms" :key="room.id" color="#262626" dark>
                <v-row class="center text-center">
                    <v-col align-self="center">
                        <v-list-item-title class="headline mb-1">{{ room.name }}</v-list-item-title>
                        <v-list-item-subtitle class="sub">{{ room.time }}</v-list-item-subtitle>
                        <div class="invis">-</div>
                        <v-btn color="green" @click="analyticsLog(room.id, room.link)">Belépés</v-btn>
                        <v-btn color="primary" v-if="isNotInConfig() && room.active === 'false'" @click="setActive(room.id, 'true')">aktiválás</v-btn>
                        <v-btn color="primary" v-if="isNotInConfig() && room.active === 'true'" @click="setActive(room.id, 'false')">deaktivál</v-btn>
                        <v-btn icon color="red" class="icobtn" v-if="isNotInConfig()" @click="deleteRoom(room.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <div class="clicks">{{ room.clicks }}</div>
                <div class="nextUpcoming" v-if="room.active === 'true' && !isNotInConfig()">MOST</div>
                <div class="nextUpcomingAdminMode" v-if="room.active === 'true' && isNotInConfig()">MOST</div>
                <div class="invis-small">-</div>
            </v-card>
        </transition-group>
    </div>
</template>

<script>
import { db } from '../firebase/db'
import { increment } from '../firebase/db'
export default {
    data() {
        return {
            rooms: [],
            newItem: "",
            newLink: "",
            newTimestamp: "",
            newSerial: "",
        }
    },
    methods: {
        async addItem() {
            if(this.newItem) {
                db.collection('5a-classes').add({ name: this.newItem, link: this.newLink, time: this.newTimestamp, serial: this.newSerial, clicks: 0, active: 'false' });
                this.newItem = "";
                this.newLink = "";
                this.newTimestamp = "";
                this.newSerial = "";
            }
        },
        async analyticsLog(id, link) {
            open(link);
            const ref = db.collection('5a-classes').doc(id);
            ref.update({ clicks: increment });
        },
        deleteRoom(id) {
            db.collection("5a-classes").doc(id).delete();
        },
        isNotInConfig() {
            //true if admin mode
            return false;
        },
        setActive(id, active) {
            const ref = db.collection('5a-classes').doc(id);
            ref.update({ active: active });
        }
    },
    firestore: {
        rooms: db.collection('5a-classes').orderBy('serial', 'asc'),
    },
}
</script>

<style lang="scss">
.sub {
    color: rgb(105, 105, 105);
};

.frhurehgtr {
    width: 100%;
}

.big-invis {
    height: 2000px;
}

.icobtn {
    left: -260px;
    background-color: rgb(54, 54, 54);
};

.clicks {
    color: rgb(255, 255, 255);
    position: relative;
    left: 88%;
    top: -30px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgb(59, 59, 59);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    max-width: 40px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
}

.nextUpcoming {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -54px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgba(224, 31, 31, 0.911);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    max-width: 60px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
}

.nextUpcomingAdminMode {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -95px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgba(224, 31, 31, 0.911);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    max-width: 60px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
}

.invis {
    color: rgba(0, 0, 0, 0);
    height: 10px;
    padding: center;
};

.invis-small {
    color: rgba(0, 0, 0, 0);
    height: 1px;
    padding: center;
};
</style>
