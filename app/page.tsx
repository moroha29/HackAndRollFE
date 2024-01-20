"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/NavBar";
import FormDialog from "@/components/LoginModal2";

export default function SimpleBottomNavigation() {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="mb-32 grid text-center lg:text-left lg:mr-[20em]">
                    <div className="group rounded-lg border border-transparent px-5 py-4">
                        <h1 className={`mb-3 text-6xl font-semibold`}>MewTwo</h1>
                        <p className={`m-0 mb-3 text-l opacity-50`}>AI-powered degeneracy, brought to you by degenerates.</p>
                        <FormDialog />
                    </div>
                </div>
            </main>
            <Box sx={{ width: "100%" }} className="fixed z-10 bottom-0">
                <Navbar />
            </Box>
        </div>
    );
}
