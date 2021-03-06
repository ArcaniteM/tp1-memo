import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'memo', idUtilisateur, 'taches')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}


export async function creer(idUtilisateur, tache) {
    // On ajoute dateModif à l'objet taches
    // Remarquez que nous utilisons l'objet Timestamp de Firestore pour obtenir
    // un objet date contenant le temps au serveur...
    tache.dateModif = Timestamp.now();
    // Référence à la collection dans laquelle on veut ajouter le taches
    let coll = collection(bdFirestore, 'memo', idUtilisateur, 'taches');
    // Ajout du taches avec addDoc : retourne une promesse contenant une 
    // "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, tache);
    // On utilise la référence pour obtenir l'objet représentant le document
    // ajouté grâce à la fonction getDoc (au singulier !) : cette fonction retourne 
    // une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}