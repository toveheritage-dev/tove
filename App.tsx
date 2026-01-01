
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, MessageCircle, MapPin, Mail, Phone, User } from 'lucide-react';

const HeritageFeature = ({ title, subtitle, imageLink, description }: { title: string, subtitle: string, imageLink: string, description: string }) => {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12 px-6">
      <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-2 text-center">{title}</h2>
      <p className="text-nobel-gold font-serif italic text-lg mb-10 text-center">{subtitle}</p>
      
      <div className="w-full aspect-[3/4] md:aspect-[16/9] mb-10 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
        <img 
          src={imageLink} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200";
          }}
        />
      </div>
      
      <p className="text-stone-400 text-lg leading-relaxed text-center max-w-2xl">
        {description}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 selection:bg-nobel-gold selection:text-white">
      
      {/* Floating Contact FAB */}
      <button 
        onClick={scrollToSection('contact')}
        className="fixed bottom-8 right-8 z-50 p-4 bg-nobel-gold text-stone-950 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Contact Us"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/90 backdrop-blur-md shadow-2xl py-4 border-b border-stone-800/50' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-nobel-gold rounded-full flex items-center justify-center text-stone-950 font-serif font-bold text-2xl shadow-lg pb-1">α</div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-white transition-colors cursor-pointer">Introduction</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-white transition-colors cursor-pointer">The Surface Code</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-white transition-colors cursor-pointer">Impact</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-6 py-2 border border-stone-700 rounded-full hover:border-nobel-gold hover:text-nobel-gold transition-all cursor-pointer">Contact Us</a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-950 flex flex-col items-center justify-center gap-10 text-2xl font-serif text-white animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors">Introduction</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors">The Surface Code</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors">Impact</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-nobel-gold transition-colors">Contact</a>
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32}/></button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
        <HeroScene />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(13,13,13,0.4)_0%,rgba(13,13,13,0.9)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-nobel-gold rounded-full flex items-center justify-center text-stone-950 font-serif font-bold text-6xl shadow-2xl pb-2">α</div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.3em] font-light mb-16 text-white uppercase opacity-90">
            Tove Heritage
          </h1>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-4 text-xs tracking-widest text-stone-500 hover:text-white transition-all cursor-pointer">
                <span>SCROLL TO DISCOVER</span>
                <span className="p-3 border border-stone-800 rounded-full group-hover:border-nobel-gold group-hover:text-nobel-gold transition-all bg-stone-900/50">
                    <ArrowDown size={18} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-32 bg-stone-950 border-b border-stone-900">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-[0.3em] text-nobel-gold uppercase">Introduction</div>
              <h2 className="font-serif text-5xl mb-8 leading-tight text-white">The Noise Barrier</h2>
              <div className="w-20 h-0.5 bg-nobel-gold/50"></div>
            </div>
            <div className="md:col-span-8 text-xl text-stone-400 leading-relaxed space-y-8 font-light">
              <p>
                <span className="text-6xl float-left mr-4 mt-1 font-serif text-nobel-gold">B</span>uilding a large-scale quantum computer requires correcting the errors that inevitably arise in physical systems. The state of the art is the <strong>surface code</strong>, which encodes information redundantly across many physical qubits.
              </p>
              <p>
                However, interpreting the noisy signals from these codes—a task called "decoding"—is a massive challenge. <strong className="text-white font-medium">Tove Heritage</strong> explores the frontier of neural decoding, where AI learns complex error patterns directly from the quantum processor, achieving accuracy far beyond traditional algorithms.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Surface Code */}
        <section id="science" className="py-32 bg-stone-900/30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-800 text-stone-300 text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-stone-700">
                            <BookOpen size={14} className="text-nobel-gold"/> THE ARCHITECTURE
                        </div>
                        <h2 className="font-serif text-5xl mb-8 text-white">The Surface Code</h2>
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                           In a surface code, "Data Qubits" hold the quantum information, while "Stabilizer Qubits" interspersed between them act as watchdogs. They measure parity checks (X and Z type) to detect errors without destroying the quantum state.
                        </p>
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                            When a data qubit flips, adjacent stabilizers light up. The pattern of these lights is the "syndrome." The decoder's job is to look at the syndrome and guess which data qubit flipped.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-nobel-gold/5 blur-3xl rounded-full"></div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Neural Decoding Innovation */}
        <section className="py-32 bg-black overflow-hidden relative border-y border-stone-900">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-900 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-stone-800">
                            THE INNOVATION
                        </div>
                        <h2 className="font-serif text-5xl mb-8 text-white">Neural Decoding</h2>
                        <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                            Standard decoders assume simple, independent errors. Real hardware is messier. AlphaQubit treats decoding as a sequence prediction problem, using a <strong>Recurrent Transformer</strong> architecture.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed font-light italic">
                            It ingests the history of stabilizer measurements and uses "soft" analog information to make highly informed predictions about logical errors.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-32 bg-stone-950">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="font-serif text-5xl mb-8 text-white">The Path to Fault Tolerance</h2>
                    <p className="text-xl text-stone-400 leading-relaxed font-light">
                        Our research maintains its advantage even as complexity increases. By learning from data directly, we reduce the hardware requirements for useful quantum computing.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto mb-32">
                    <PerformanceMetricDiagram />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-stone-900 pt-32">
                    <div className="aspect-square bg-stone-900/50 rounded-2xl overflow-hidden relative border border-stone-800 shadow-2xl">
                        <QuantumComputerScene />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60"></div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="font-serif text-4xl mb-8 text-white">Sycamore Integration</h2>
                        <p className="text-lg text-stone-400 mb-10 leading-relaxed">
                            Tested on Google's Sycamore processor, Tove Heritage methodologies demonstrate that machine learning decoders can adapt to the unique quirks of each processor.
                        </p>
                        <div className="p-10 bg-stone-900/30 border border-stone-800 rounded-2xl border-l-4 border-l-nobel-gold shadow-xl">
                            <p className="font-serif italic text-2xl text-stone-200 mb-6 leading-relaxed">
                                "Our work illustrates the ability of machine learning to go beyond human-designed algorithms, highlighting it as a strong contender for the future of quantum computing."
                            </p>
                            <span className="text-sm font-bold text-nobel-gold tracking-widest uppercase">— Tove Heritage Research</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Heritage Feature (Replacing Authors) */}
        <section className="py-32 bg-stone-900/20 border-t border-stone-900">
           <HeritageFeature 
              title="The Visionary Pursuit"
              subtitle="Defining the future of quantum error correction through elegance and precision."
              imageLink="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" // Replace with your Google Drive Link
              description="At Tove Heritage, we believe that the complexity of quantum systems demands a new paradigm of understanding. Our team blends deep quantum theory with cutting-edge artificial intelligence to create decoders that don't just solve problems—they learn the language of the machine itself. This portrait represents our commitment to clarity amidst the quantum noise."
           />
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-32 bg-stone-950 border-t border-stone-900">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-5xl text-white mb-4">Contact Us</h2>
                    <p className="text-stone-500 font-light italic">We'd love to hear from you about your quantum journey.</p>
                </div>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-stone-500 uppercase flex items-center gap-2">
                            <User size={14} className="text-nobel-gold"/> Name
                        </label>
                        <input type="text" placeholder="Your full name" className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-stone-200 focus:outline-none focus:border-nobel-gold transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-stone-500 uppercase flex items-center gap-2">
                            <Mail size={14} className="text-nobel-gold"/> Email Address
                        </label>
                        <input type="email" placeholder="email@example.com" className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-stone-200 focus:outline-none focus:border-nobel-gold transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold tracking-widest text-stone-500 uppercase flex items-center gap-2">
                            <Phone size={14} className="text-nobel-gold"/> Phone / Username
                        </label>
                        <input type="text" placeholder="+1 (234) 567 or @username" className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-stone-200 focus:outline-none focus:border-nobel-gold transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold tracking-widest text-stone-500 uppercase">Notes</label>
                        <textarea rows={4} placeholder="How can we help?" className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-stone-200 focus:outline-none focus:border-nobel-gold transition-colors resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <button className="w-full py-5 bg-nobel-gold text-stone-950 font-bold tracking-[0.2em] uppercase rounded-lg hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-xl">
                            Send To Us
                        </button>
                    </div>
                </form>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black text-stone-400 py-24 border-t border-stone-900">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-20">
                {/* Brand Identity */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="p-4 border-2 border-nobel-gold rounded-xl mb-6 inline-block">
                        <div className="text-nobel-gold font-serif font-bold text-4xl pb-1 px-1">α</div>
                    </div>
                    <h3 className="text-white font-serif text-2xl mb-4">Tove Heritage</h3>
                    <p className="text-sm leading-relaxed font-light text-stone-500 max-w-xs text-center md:text-left">
                        Dedicated to the preservation and advancement of quantum knowledge through innovative computational aesthetics.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2">Connect</h4>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 group-hover:border-nobel-gold transition-colors">
                            <Mail size={18} className="text-nobel-gold"/>
                        </div>
                        <div>
                            <div className="text-[10px] text-stone-500 uppercase tracking-widest">Mail</div>
                            <div className="text-sm text-stone-300 group-hover:text-white transition-colors">hello@toveheritage.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 group-hover:border-nobel-gold transition-colors">
                            <Phone size={18} className="text-nobel-gold"/>
                        </div>
                        <div>
                            <div className="text-[10px] text-stone-500 uppercase tracking-widest">Phone / Username</div>
                            <div className="text-sm text-stone-300 group-hover:text-white transition-colors">@toveheritage</div>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6">Location</h4>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800 mt-1">
                            <MapPin size={18} className="text-nobel-gold"/>
                        </div>
                        <div className="text-sm text-stone-300 leading-relaxed font-light">
                            Quantum Heights, Suite 101<br/>
                            Innovation District<br/>
                            Silicon Valley, CA 94025
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="pt-12 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-stone-600">
                <div>Copyright &copy; 2024 Tove Heritage. All Rights Reserved.</div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-nobel-gold transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-nobel-gold transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
