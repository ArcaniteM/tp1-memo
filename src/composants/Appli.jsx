import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';
import { useState, useEffect } from 'react';
import { observerEtatConnexion } from '../code/utilisateur';
import { creer } from '../code/tache-modele';

export default function Appli() {
    // État 'utilisateur'
    const [utilisateur, setUtilisateur] = useState(null);

    // État des 'taches' de l'utilisateur connecté
    const [taches, setTaches] = useState([]);

      // Gérer l'ajout d'un tache
    function gererAjoutTache(titre) {
      creer(utilisateur.uid, {titre: titre})
      .then(
        // On augmente les taches avec le nouveau document que nous 
        // venons d'ajouter dans Firestore
        // Remarquez que le document reçu est un objet complexe Firestore, et 
        // on doit construire l'objet simple avec le quel nous travaillons qui
        // contient uniquement les propriétés 'id' et 'titre', 'couleur', 
        // 'couverture', 'dateModif'
        doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
      ).catch((err) => {
        console.log(err)
      })
    }

    // Surveiller l'état de la connexion Firebase Auth
    useEffect(() => observerEtatConnexion(setUtilisateur),[]);

  return (
    // 1)  Si un utilisateur est connecté : 
    utilisateur ?
      <div className="Appli">
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur}/>
        </header>
        <Taches utilisateur={utilisateur} setTaches={setTaches} taches={taches} gererAjoutTache={gererAjoutTache} />
        <Controle />
      </div>
    :
    // 2) Par contre si aucun utilisateur n'est connecté, on affiche plutôt le composant suivant : 
      <Accueil />
  );
}
