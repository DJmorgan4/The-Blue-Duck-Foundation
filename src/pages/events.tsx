import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Events() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        {/* Events calendar/list */}
      </main>
      <Footer />
    </div>
  );
}
