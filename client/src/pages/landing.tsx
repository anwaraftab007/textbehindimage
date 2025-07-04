import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Menu, Layers, Crown, Check, Twitter, Instagram, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import AnimatedGallery from '@/components/animated-gallery';
import AuthModal from '@/components/auth-modal';
import PaymentModal from '@/components/payment-modal';

export default function Landing() {
  const [, setLocation] = useLocation();
  const { user, appUser, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenApp = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else if (!appUser?.hasPaid) {
      setIsPaymentModalOpen(true);
    } else {
      setLocation('/app');
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 bg-dark/80 backdrop-blur-lg border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Layers className="text-primary text-2xl" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BakTXT
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#gallery" className="text-slate-300 hover:text-white transition-colors">Gallery</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-300">Hi, {user.user_metadata.full_name || user.email}</span>
                  <Button variant="outline" onClick={signOut}>Sign Out</Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  Sign In
                </Button>
              )}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="text-xl" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
        <div className="absolute inset-0">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, delay: 2 }}
            className="absolute bottom-40 right-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, delay: 4 }}
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Create stunning{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              text-behind-image
            </span>{' '}
            designs
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Transform your photos with eye-catching text overlays that appear to go behind objects. 
            Used by 300,000+ creators worldwide.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={handleOpenApp}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25"
            >
              <Play className="mr-2 h-5 w-5" />
              Open App - ₹299
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToGallery}
              className="border-slate-600 hover:border-slate-500 text-white px-8 py-4 text-lg font-semibold hover:bg-slate-800/50"
            >
              <Eye className="mr-2 h-5 w-5" />
              See Examples
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-slate-400"
          >
            <p className="text-sm mb-2">✨ One-time payment • ∞ Unlimited use • 🔒 Secure download</p>
          </motion.div>
        </div>
      </section>

      {/* Animated Gallery */}
      <div id="gallery">
        <AnimatedGallery />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why choose{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BakTXT?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Professional results with simple tools. Create viral content in minutes, not hours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'AI-Powered Magic',
                description: 'Automatically detects objects and places text behind them with perfect precision.',
                gradient: 'from-primary to-secondary'
              },
              {
                icon: '⬇️',
                title: 'High-Quality Downloads',
                description: 'Export in multiple formats and resolutions perfect for social media or print.',
                gradient: 'from-secondary to-accent'
              },
              {
                icon: '♾️',
                title: 'Unlimited Usage',
                description: 'One payment, lifetime access. Create as many designs as you want.',
                gradient: 'from-accent to-primary'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-colors group border border-slate-700/50"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See the{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                app
              </span>{' '}
              in action
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Try our editor with full functionality after purchase
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-8">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="bg-slate-800 px-6 py-4 flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-slate-400 text-sm">backdrop-text-behind-image.vercel.app</div>
                </div>
                <div className="aspect-video">
                  <iframe 
                    src="https://backdrop-text-behind-image.vercel.app/" 
                    className="w-full h-full"
                    title="Text Behind Image App Preview"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-surface/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Simple{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              pricing
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            One payment. Unlimited access. No subscriptions, no hidden fees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-secondary text-white px-6 py-2 rounded-bl-2xl">
              <span className="text-sm font-semibold">BEST VALUE</span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-white">Lifetime Access</h3>
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ₹299
                </span>
                <span className="text-slate-400 ml-2">one time</span>
              </div>
              
              <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                {[
                  'Unlimited text-behind-image designs',
                  'High-resolution downloads',
                  'Commercial usage rights',
                  'No watermarks',
                  'Lifetime updates'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-white">
                    <Check className="text-accent mr-3 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleBuyNow}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-12 py-4 text-lg font-semibold shadow-lg shadow-primary/25"
              >
                <Crown className="mr-2 h-5 w-5" />
                Get Lifetime Access
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

{/* Footer */}
<footer className="py-12 border-t border-slate-700/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Layers className="text-primary text-2xl" />
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          BakTXT
        </span>
      </div>

      <p className="text-slate-400 mb-6">
        Create stunning text-behind-image designs with ease
      </p>

      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" className="text-slate-400 hover:text-white transition-colors">
          <Twitter className="h-6 w-6" />
        </a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors">
          <Instagram className="h-6 w-6" />
        </a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors">
          <Github className="h-6 w-6" />
        </a>
      </div>

      {/* ✅ Policy Links */}
      <div className="flex justify-center space-x-4 mb-6 text-sm text-slate-500">
        <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
        <a href="/refund" className="hover:text-white transition-colors">Refund</a>
        <a href="/contact" className="hover:text-white transition-colors">Contact</a>
      </div>

      <p className="text-slate-500 text-sm">
        2025 © BakTXT - All Rights Reserved
      </p>
    </div>
  </div>
</footer>


      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </div>
  );
}
