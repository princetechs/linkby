// use server

import React from 'react';
import { fetchSession } from './authAction.server';

export default function SessionServerComponent() {
    const session = fetchSession();
    return session;
}
