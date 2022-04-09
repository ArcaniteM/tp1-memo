import './Tache.scss';
import { formaterDate } from '../code/date';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// import ColorButtons from '../code/buttons';

function ColorButtonsVert() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success">
        Basculer
      </Button>
    </Stack>
  );
}

function ColorButtonsRouge() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" color="error">
        Supprimer
      </Button>
    </Stack>
  );
}

export default function Tache({id, titre, dateModif}) {
  return (
    <div className="Tache">
      {/* Basculer */}
      <ColorButtonsVert />
      <span className="texte">{titre}</span>
      <span className="date">{formaterDate(dateModif.seconds)}</span>
      {/* Supprimer */}
      <ColorButtonsRouge />
    </div>
  );
}