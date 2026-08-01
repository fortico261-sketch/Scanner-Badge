import React from 'react';

type Props = { employe: any };

export default function FicheEmploye({ employe }: Props) {
	if (!employe) return null;
	return (
		<div className="p-2 border rounded">
			<h4 className="font-bold">{employe.nom} {employe.prenom}</h4>
			<div>Badge ID: {employe.badgeId}</div>
			<div>Taux Horaire: {employe.tauxHoraire}</div>
			<div>Volume Mensuel: {employe.volumeMensuelObligatoire}</div>
			<div>Chantier ID: {employe.chantierId}</div>
		</div>
	);
}