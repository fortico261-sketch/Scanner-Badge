import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	children: React.ReactElement;
};

export default function RouteProtegee({ children }: Props) {
	const token = localStorage.getItem('auth_token');
	if (!token) return <Navigate to="/login" replace />;
	return children;
}
