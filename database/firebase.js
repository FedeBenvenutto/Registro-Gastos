import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDGq3zIO1SGjAPf9pwZvPpzRfdgVIYeB28",
    authDomain: "registro-de-gastos-7bbb1.firebaseapp.com",
    projectId: "registro-de-gastos-7bbb1",
    storageBucket: "registro-de-gastos-7bbb1.appspot.com",
    messagingSenderId: "207544566317",
    appId: "1:207544566317:web:2a95aff7db7973f5b92ea4"
  };

  const app= initializeApp(firebaseConfig);
  export const db = getFirestore(app)