import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'tp1-memo', idUtilisateur, 'taches')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}


export async function creer(idUtilisateur, dossier) {
    // On ajoute dateModif à l'objet dossier
    // Remarquez que nous utilisons l'objet Timestamp de Firestore pour obtenir
    // un objet date contenant le temps au serveur...
    dossier.dateModif = Timestamp.now();
    // Référence à la collection dans laquelle on veut ajouter le dossier
    let coll = collection(bdFirestore, 'tp1-memo', idUtilisateur, 'taches');
    // Ajout du dossier avec addDoc : retourne une promesse contenant une 
    // "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, dossier);
    // On utilise la référence pour obtenir l'objet représentant le document
    // ajouté grâce à la fonction getDoc (au singulier !) : cette fonction retourne 
    // une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}