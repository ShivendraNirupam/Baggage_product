import ChatBot from '@/components/chatbot';
import Sidebar from '@/components/sidebar';
import React from 'react';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex items-center">
            <div className= " flex sm:items-center flex-col gap-4 justify-center p-2 min-w-screen">
                <Sidebar className=''/>
                {children}
                <ChatBot />
            </div>
        </section>
    );
}