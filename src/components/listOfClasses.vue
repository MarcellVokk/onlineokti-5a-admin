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
                        <v-btn color="primary" v-show="isNotInConfig() && room.active === 'false'" @click="setActive(room.id, 'true')">aktiválás</v-btn>
                        <v-btn color="primary" v-show="isNotInConfig() && room.active === 'true'" @click="setActive(room.id, 'false')">deaktivál</v-btn>
                        <v-btn icon color="red" class="icobtn" v-if="isNotInConfig()" @click="deleteRoom(room.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <div class="clicks">{{ room.clicks }}</div>

                <div class="reactEmoji" id="room.name" @click="reactLike(room.id, room.likes, room.name)" v-if="!isNotInConfig()">
                    <v-icon class="reactEmojiEmoji" small color="blue">{{likedStyling}}</v-icon>
                    <div class="reactEmojiCounter">{{ room.likes }}</div>
                </div>

                <div class="reactEmojiAdmin" :class="{ liked: liked }" @click="reactLike(room.id, room.likes)" v-if="isNotInConfig()">
                    <v-icon class="reactEmojiEmoji" small color="blue">{{likedStyling}}</v-icon>
                    <div class="reactEmojiCounter">{{ room.likes }}</div>
                </div>

                <div class="nextUpcoming" v-if="room.active === 'true'">
                    <v-icon small color="#de1414">mdi-alarm-bell</v-icon>
                </div>
                <div class="invis-small"></div>
            </v-card>
        </transition-group>
    </div>
</template>

<script>
import { db } from '../firebase/db'
import { increment } from '../firebase/db'

var deffaultCollection = "classes" //the working collection

export default {
    data() {
        return {
            rooms: [],
            newItem: "",
            newLink: "",
            newTimestamp: "",
            newSerial: "",
            liked: false,
            likedStyling: "mdi-thumb-up-outline",
        }
    },
    methods: {
        async addItem() {
            if(this.newItem) {
                db.collection(deffaultCollection).add({ name: this.newItem, link: this.newLink, time: this.newTimestamp, serial: this.newSerial, clicks: 0, active: 'false', likes: 0 });
                this.newItem = "";
                this.newLink = "";
                this.newTimestamp = "";
                this.newSerial = "";
            }
        },
        async analyticsLog(id, link) {
            open(link);
            const ref = db.collection(deffaultCollection).doc(id);
            ref.update({ clicks: increment });
        },
        async deleteRoom(id) {
            await db.collection(deffaultCollection).doc(id).delete();
        },
        isNotInConfig() {
            //true if admin mode
            return false;
        },
        async setActive(id, active) {
            const ref = db.collection(deffaultCollection).doc(id);
            await ref.update({ active: active });
        },
        async reactLike(id, likes, idReal) {

            if(likes < 100) {
                const ref = db.collection(deffaultCollection).doc(id);
                await ref.update({ likes: increment });
            }
            var btn = document.getElementById(idReal);
            if(btn.classList.contains("liked")) {
                btn.classList.remove("liked");
            }
            else {
                btn.classList.add("liked");
            }
        }
    },
    firestore: {
        rooms: db.collection(deffaultCollection).orderBy('serial', 'asc'),
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
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    text-align: center;
    max-width: 40px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
};

.nextUpcoming {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -146px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgba(224, 31, 31, 0.164);
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    text-align: center;
    max-width: 30px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
};

.nextUpcomingAdminMode {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -95px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgba(224, 31, 31, 0.911);
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    text-align: center;
    max-width: 60px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
};

.reactEmoji {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -54px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgb(59, 59, 59);
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    text-align: center;
    width: 60px;
    height: 25px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
    cursor: pointer;
    transition: 0.5s;

    &.liked {
        background-color: #2195f328;
    }
};

.reactEmojiAdmin {
    color: rgb(255, 255, 255);
    position: relative;
    left: 0%;
    top: -90px;
    padding-left: 10px center;
    border: #fff;
    background-color: rgb(59, 59, 59);
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    text-align: center;
    width: 60px;
    height: 25px;
    box-shadow: 0px 0px 12px rgb(29, 29, 29);
    cursor: pointer;
}

.reactEmojiEmoji {
    position: relative;
    width: 5px;
    top: -1px;
    max-width: 5px;
    height: 5px;
    max-height: 5px;
    color: rgba(255, 0, 0, 0);
    background-color: rgba(255, 0, 0, 0);
    left: -15px;
};

.reactEmojiCounter {
    position: relative;
    top: -23px;
    left: 25px;
    width: 30px;
    background-color: rgba(255, 0, 0, 0);
    user-select: none;
};

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
