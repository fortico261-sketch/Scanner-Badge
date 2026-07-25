import React from 'react';

type Props = { employe: any };

export default function FicheEmploye({ employe }: Props) {
	if (!employe) return null;
	return (
		<div className="p-2 border rounded">
			<h4 className="font-bold">{employe.nom} {employe.prenom}</h4>
			<div>Email: {employe.email}</div>
			<div>Poste: {employe.poste}</div>
		</div>
	);
}
