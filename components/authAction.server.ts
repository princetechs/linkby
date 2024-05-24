// use server

import { auth } from "@/auth";

export async function fetchSession() {
    try {
        const sessionData = await auth();
        return sessionData;
    } catch (error) {
        console.error('Failed to fetch session:', error);
        return null;
    }
}
