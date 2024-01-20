"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/NavBar";
import RegisterForm from "@/components/LoginModal2";
import LoginForm from "@/components/LoginModal";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function SimpleBottomNavigation() {
    useEffect(()=>{
        const token = localStorage.getItem('jwtToken');
        if (token) {
            redirect("/question");
        }
    },[])
    return (
        <div className="bg-gradient-to-b from-pink-100">
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="mb-32 grid text-center lg:text-left lg:mr-[20em]">
                    <div className="group rounded-lg border border-transparent px-5 py-4">
                        <h1 className={`mb-3 text-6xl font-semibold`}>MewTwo</h1>
                        <p className={`m-0 mb-3 text-l opacity-50`}>AI-powered degeneracy, brought to you by degenerates.</p>
                        <div className="xl:columns-3 mb-3 mt-8 "><LoginForm /></div>
                        <div className="xl:columns-3 "><RegisterForm /></div>
                    </div>
                </div>
            </main>
            <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
                <Navbar />
            </Box>
        </div>
    );
}
