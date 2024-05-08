'use client'

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("cd7a8e60-b6cd-4b7e-bc46-bb6f8afc8a4b")
    },[])
    return null
}