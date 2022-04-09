import Tache from './Tache';
import './Taches.scss';
import { useState, useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';

export default function Taches({utilisateur, taches, setTaches, gererAjoutTache}) {
  const [titre, setTitre] = useState('');

  useEffect(
    () => tacheModele.lireTout(utilisateur.uid).then(
      lesTaches => setTaches(lesTaches)
    )
    , [utilisateur, setTaches]
  );

function gererSoumettre() {
  // Code qui gère l'ajout dans Firestore
        if(titre.search(/[a-z]{2,}/i) != -1) {
            gererAjoutTache(titre);
            //gererFermer();
        }
}


  return (
    <section className="Taches">
      <form onSubmit={(e) => {
        // setTitre(e.target.texteTache.value)
        gererSoumettre()
      }}>
        <input 
          id="titre"
          label="Titre du tache"
          type="text"   
          placeholder="Ajoutez une tâche ..."
          onChange={(e) => setTitre(e.target.value)}
          name="texteTache"
          autoComplete="off" 
        />
      </form>
      <div className="liste-taches">
        {
          taches.map( 
            // Remarquez l'utilisation du "spread operator" pour "étaler" les 
            // propriétés de l'objet 'tache' reçu en paramètre de la fonction
            // fléchée dans les props du composant 'tache' !!
            tache => (
              <Tache key={tache.id} id={tache.id} titre={tache.titre} dateModif={tache.dateModif}/>
            )
          )
        }
      </div>
    </section>
  );
}