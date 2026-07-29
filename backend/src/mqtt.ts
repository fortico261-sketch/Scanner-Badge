import mqtt from "mqtt";
import { PayloadPointage } from "./modules/pointages/pointage.dto";
import { pointagesService } from "./modules/pointages/pointage.module";

const broker_url = process.env.MQTT_URL || "";
console.log(broker_url);

const options = {
    clientId: "backend_listener",
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    clean: true,
    reconnectPeriod: 2000,
};

const client = mqtt.connect(broker_url, options);

client.on("connect", () => {
    console.log("✅ Connecté au broker Mosquitto en écoute");

    const topicToSubscribe = process.env.MQTT_TOPIC || "";

    client.subscribe(topicToSubscribe, { qos: 1 }, (err) => {
        if (err) {
            console.error("Erreur lors de l'abonnement :", err);
        } else {
            console.log(`Abonné avec succès au topic : [${topicToSubscribe}]`);
            console.log("En attente de pointages...\n");
        }
    });
});

client.on("message", async (topic, message) => {
    console.log(`Message reçu sur le topic : [${topic}]`);

    try {
        const payload = JSON.parse(message.toString()) as PayloadPointage;

        console.log("--- Détails du Pointage ---");
        console.log(payload);
        console.log("-------------------------------\n");

        await pointagesService.save(payload);
    } catch (error) {
        console.log("• Contenu brut (non JSON) :", message.toString());
    }
});

client.on("error", (err) => {
    console.error("Erreur MQTT :", err.message);
});

client.on("reconnect", () => {
    console.log("Reconnexion au broker en cours...");
});
