/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { AboutAndFounder } from './components/AboutAndFounder';
import { CreativeProcess } from './components/CreativeProcess';
import { RateCards } from './components/RateCards';
import { EnquiryForm } from './components/EnquiryForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { Fireflies } from './components/Fireflies';

export default function App() {
  const [preselectedEventType, setPreselectedEventType] = useState<string | undefined>(undefined);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceCategory = (categoryTitle: string) => {
    setPreselectedEventType(categoryTitle);
    scrollToContact();
  };

  const handleSelectPackage = (packageName: string) => {
    setPreselectedPackage(packageName);
    scrollToContact();
  };

  const handleEnquireForReelStyle = (category: string) => {
    setPreselectedEventType(category);
    scrollToContact();
  };

  const handleClearPrefill = () => {
    setPreselectedEventType(undefined);
    setPreselectedPackage(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E7] text-[#111111] font-sans selection:bg-[#C8B58C] selection:text-[#111111] relative">
      {/* Subtle Celebratory Ambient Fireflies */}
      <Fireflies />

      {/* Editorial Navigation */}
      <Navbar onNavigateToEnquiry={scrollToContact} />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenEnquiry={scrollToContact}
          onExploreWork={() => {
            const workSection = document.querySelector('#work');
            workSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Selected Work — Instagram Reels (Near-black background) */}
        <SelectedWork onEnquireForStyle={handleEnquireForReelStyle} />

        {/* Rate Cards & Packages (Near-black background) - Kept Up */}
        <RateCards onSelectPackage={handleSelectPackage} />

        {/* About Brand & Founder Story: Prachi Pamnani (Ivory editorial background) */}
        <AboutAndFounder />

        {/* Creative Process — 4 Steps */}
        <CreativeProcess />

        {/* Services & Festivities (Architectural dark tone) - Kept Down */}
        <Services onSelectServiceCategory={handleSelectServiceCategory} />

        {/* Enquiry Form & Contact (Headline: YOUR MOMENT. YOUR STORY. LET'S CREATE.) */}
        <EnquiryForm
          preselectedEventType={preselectedEventType}
          preselectedPackage={preselectedPackage}
          onClearPrefill={handleClearPrefill}
        />
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
