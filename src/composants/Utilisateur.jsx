import './Utilisateur.scss';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deconnexion } from '../code/utilisateur';

export default function Utilisateur({utilisateur}) {
  return (
    <div className="Utilisateur">
      {/* <span className="nom">Monsieur Untel</span> */}
      {utilisateur?.displayName} 
      <Avatar className="avatar" alt="Le même Monsieur Untel" title="Email de l'utilisateur ici" />
      
      <Button 
        variant="outlined"
        size="small"
        className="btn-deconnexion"
        onClick={() => alert('À compléter')}
      >
        <div className="btn-deconnexion" onClick={deconnexion}>Déconnexion</div>
      </Button>
    </div>
  );
}