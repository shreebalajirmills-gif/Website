import React from 'react'
import Navbar from './components/Navbar'
import GrowthTimelineDemo from './components/GrowthTimelineDemo'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        navigationLinks={[
          { label: 'Home', href: '#home' },
          { label: 'Products', href: '#products' },
          { label: 'Scale & Growth', href: '#scale' },
          { label: 'Certifications', href: '#certifications' },
          { label: 'Investors', href: '#investors' },
          { label: 'Contact', href: '#contact' },
        ]}
        onCTAClick={() => {
          const el = document.querySelector('#contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="pt-24">
        <section id="home" className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to Shree Balaji</h1>
        </section>
        <section id="products" className="h-screen flex items-center justify-center">
          <h2 className="text-3xl">Products</h2>
        </section>
        <section id="scale" className="flex items-start justify-center py-12">
          <div style={{ width: '100%' }}>
            <GrowthTimelineDemo />
          </div>
        </section>
        <section id="certifications" className="h-screen flex items-center justify-center">
          <h2 className="text-3xl">Certifications</h2>
        </section>
        <section id="investors" className="h-screen flex items-center justify-center">
          <h2 className="text-3xl">Investors</h2>
        </section>
        <section id="contact" className="h-screen flex items-center justify-center">
          <h2 className="text-3xl">Contact / Inquiry</h2>
        </section>
      </main>
    </div>
  )
}
