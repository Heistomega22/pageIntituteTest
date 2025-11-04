import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA6bGIB8M6pnUuOVcjSnqeQsemezaoVCek",
    authDomain: "prjctsifts15.firebaseapp.com",
    projectId: "prjctsifts15",
    storageBucket: "https://prjctsifts15-default-rtdb.firebaseio.com/",
    messagingSenderId: "158806323837",
    appId: "1:158806323837:web:b1a9d017654ee71d0c3714"
};

const app = initializeApp(firebaseConfig);
const fbdbcnn = getDatabase();

export { app, fbdbcnn };

async function testDatabaseConnection() {
    const testRef = ref(fbdbcnn, 'test_connection');
    await set(testRef, { message: "Connection successful" })
        .then(() => console.log("Database connection test successful"))
        .catch((error) => console.error("Database connection test failed:", error));
}
