import * as deepl from "deepl-node";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const authKey = process.env.DEEPL_API_KEY;

if (!authKey) {
  console.error("ERREUR : DEEPL_API_KEY manquante dans .env.local");
  process.exit(1);
}

const translator = new deepl.Translator(authKey);

// Pause entre chaque requête pour éviter TooManyRequests
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translate() {
  const fr = JSON.parse(fs.readFileSync("./src/i18n/locales/fr.json", "utf8"));
  const en = JSON.parse(fs.readFileSync("./src/i18n/locales/en.json", "utf8"));

  async function translateObject(objFr, objEn) {
    for (const key in objFr) {
      if (typeof objFr[key] === "string") {
        // Si déjà traduit → on saute
        if (objEn[key]) continue;

        try {
          const result = await translator.translateText(objFr[key], "fr", "en-US");
          objEn[key] = result.text;

          // Pause pour éviter TooManyRequests
          await wait(200);
        } catch (err) {
          console.error("Erreur DeepL :", err);
          objEn[key] = objFr[key]; // fallback
        }
      } else {
        objEn[key] = objEn[key] || {};
        await translateObject(objFr[key], objEn[key]);
      }
    }
  }

  await translateObject(fr, en);

  fs.writeFileSync("./src/i18n/locales/en.json", JSON.stringify(en, null, 2));
  console.log("Traduction EN mise à jour !");
}

translate();
