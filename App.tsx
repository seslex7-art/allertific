import { useState, useEffect, useRef } from 'react';
import {
  Phone, AlertTriangle, Target, Layers, DollarSign,
  BarChart3, Users, XCircle, Rocket, Check, X, ChevronDown,
  ChevronUp, Star, TrendingUp, AlertCircle, Clock, MapPin,
  Bell, MessageSquare, ArrowRight, ThumbsUp,
  Shield, Globe, Building2, Brain, Stethoscope,
  GraduationCap, Briefcase, Home, Eye, Send, Sparkles,
  ExternalLink, Menu, X as XIcon
} from 'lucide-react';
import {
  painPointValidation, solutionFit,
  featurePrioritization, pricing, competitiveLandscape,
  marketSizing, dealbreakers, go_to_market, overallVerdict
} from './data/validation-report';

// ============================================================
// INTERSECTION OBSERVER HOOK
// ============================================================
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ============================================================
// ANIMATED GAUGE COMPONENT
// ============================================================
function Gauge({ value, max = 10, label, color = 'from-indigo-500 to-purple-500' }: { value: number; max?: number; label: string; color?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-muted">{label}</span>
        <span className="font-bold text-text">{value}/{max}</span>
      </div>
      <div className="gauge-track h-3">
        <div
          className={`gauge-fill h-full bg-gradient-to-r ${color}`}
          style={{ width: inView ? `${(value / max) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}

// ============================================================
// EXPANDABLE Q&A COMPONENT
// ============================================================
function QAItem({ q, a, icon }: { q: string; a: string; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-5 text-left hover:bg-surface-lighter/30 transition-colors"
      >
        {icon && <div className="mt-0.5 text-primary flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          <h4 className="font-semibold text-text leading-snug">{q}</h4>
          <div className="flex items-center gap-1 mt-1 text-text-dim text-xs">
            {open ? (
              <><ChevronUp size={12} /> Click to collapse</>
            ) : (
              <><ChevronDown size={12} /> Click to expand</>
            )}
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 animate-fade-in-up">
          <div className="border-t border-surface-lighter pt-4">
            <p className="text-text-muted leading-relaxed whitespace-pre-line text-sm">{a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// RANKING BADGE
// ============================================================
function RankBadge({ rank }: { rank: number }) {
  const colors: Record<number, string> = {
    1: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    2: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    3: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    4: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    5: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${colors[rank] || colors[5]}`}>
      {rank}
    </div>
  );
}

// ============================================================
// TIER BADGE
// ============================================================
function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    'Must Have': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Should Have': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Nice to Have': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[tier] || ''}`}>
      {tier}
    </span>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================
function Section({ id, number, title, subtitle, icon: Icon, children }: {
  id: string; number: string; title: string; subtitle: string;
  icon: React.ElementType; children: React.ReactNode;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
            <Icon size={20} className="text-primary" />
          </div>
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">{number}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text mb-2">{title}</h2>
        <p className="text-text-muted text-lg mb-10">{subtitle}</p>
        <div className="section-divider mb-10" />
        {children}
      </div>
    </section>
  );
}

// ============================================================
// NAVIGATION
// ============================================================
function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'pain', label: 'Pain Point' },
    { id: 'solution', label: 'Solution Fit' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'competition', label: 'Competition' },
    { id: 'market', label: 'Market' },
    { id: 'dealbreakers', label: 'Dealbreakers' },
    { id: 'gtm', label: 'Go-to-Market' },
    { id: 'domain', label: 'Free Domain' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/90 backdrop-blur-xl border-b border-surface-lighter/50 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-bold text-text">
          <Phone size={18} className="text-primary" />
          <span className="inline text-lg">Allertific</span>
          <span className="text-primary-light text-xs font-semibold ml-1 uppercase tracking-[0.18em]">Validation Report</span>
        </button>
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xs text-text-muted hover:text-text px-3 py-1.5 rounded-lg hover:bg-surface-lighter/50 transition-colors">
              {l.label}
            </button>
          ))}
        </div>
        <button className="lg:hidden text-text-muted p-1" onClick={() => setOpen(!open)}>
          {open ? <XIcon size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-lighter/50 pb-3 px-4 space-y-1">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="block w-full text-left text-sm text-text-muted hover:text-text px-3 py-2 rounded-lg hover:bg-surface-lighter/50 transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Phone animation */}
        <div className="relative inline-block mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center animate-pulse-glow">
            <Phone size={36} className="text-white" />
          </div>
          <div className="absolute -inset-3 border border-primary/20 rounded-3xl animate-ring-pulse" />
          <div className="absolute -inset-6 border border-primary/10 rounded-3xl animate-ring-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary-light font-medium mb-6">
          <Sparkles size={14} />
          Allertific Product Validation Report
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold text-text mb-4 leading-tight">
          <span className="block">Allertific</span>
          <span className="gradient-text">The Reminder You Can't Swipe Away</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Brutally honest product validation for Allertific — an app that places real reminder calls for appointments you absolutely cannot miss.
          Written from the perspective of a skeptical potential customer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById('pain')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2">
            Read Full Report
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3 text-text-dim text-sm">
            <div className="flex -space-x-2">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-surface flex items-center justify-center text-xs ${['bg-emerald-500/30 text-emerald-400', 'bg-blue-500/30 text-blue-400', 'bg-amber-500/30 text-amber-400'][i]}`}>
                  {[<Brain size={12} />, <Stethoscope size={12} />, <Briefcase size={12} />][i]}
                </div>
              ))}
            </div>
            <span>Validated across 8 dimensions</span>
          </div>
        </div>

        {/* Concept cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            { icon: Clock, label: 'Day Before', color: 'from-blue-500/10 to-blue-500/5 border-blue-500/20' },
            { icon: Bell, label: 'Morning Of', color: 'from-amber-500/10 to-amber-500/5 border-amber-500/20' },
            { icon: MapPin, label: 'Time to Leave', color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20' },
          ].map((item, i) => (
            <div key={i} className={`glass-card rounded-xl p-4 border ${item.color} transition-transform hover:scale-105`}>
              <item.icon size={20} className="text-text-muted mb-2" />
              <div className="text-sm font-medium text-text">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navigation />
      <Hero />

      {/* ===================== SECTION 1: PAIN POINT ===================== */}
      <Section
        id="pain" number="Section 1"
        title="Pain Point Validation"
        subtitle="How real is the problem we're solving?"
        icon={AlertTriangle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Frustration Score</h3>
            <Gauge value={painPointValidation.score} label="Overall frustration with current solutions" color="from-red-500 to-orange-500" />
            <p className="mt-4 text-xs text-text-dim">
              "Not rage-inducing, but a persistent, low-grade frustration. The tools exist — they just don't match how my brain actually works."
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Missed Appointment Frequency</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-bold text-text">2-3</span>
              <span className="text-text-muted text-lg mb-1">per month</span>
            </div>
            <p className="text-sm text-text-dim">
              Medical appointments are the worst offenders — 3-6 weeks out, completely forgotten by the time they arrive.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {painPointValidation.findings.map((item, i) => (
            <QAItem key={i} q={item.q} a={item.a} icon={<AlertCircle size={18} />} />
          ))}
        </div>

        {/* Real consequence callout */}
        <div className="mt-8 glass-card rounded-xl p-6 border-l-4 border-l-red-500/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <DollarSign size={20} className="text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-text mb-1">Real Cost of Forgetting</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                A single missed dermatologist appointment cost <strong className="text-red-400">$150</strong> (non-refundable co-pay) + 
                <strong className="text-text"> 6 weeks</strong> waiting for a new appointment. 
                This is the moment the user realizes "forgetting has an actual dollar cost."
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== SECTION 2: SOLUTION FIT ===================== */}
      <Section
        id="solution" number="Section 2"
        title="Solution Fit"
        subtitle="Would people actually use this?"
        icon={Target}
      >
        {/* Would answer */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ThumbsUp size={24} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Would you answer a phone call reminder?</h3>
              <span className="text-emerald-400 font-semibold">Yes — but with conditions</span>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed text-sm">{solutionFit.wouldAnswerReason}</p>
        </div>

        {/* Biggest concern */}
        <div className="glass-card rounded-xl p-6 mb-8 border-l-4 border-l-amber-500/50">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={20} className="text-amber-400" />
            <h3 className="font-bold text-text">Biggest Concern</h3>
          </div>
          <p className="text-text-muted leading-relaxed text-sm">{solutionFit.biggestConcern}</p>
        </div>

        {/* Use case ranking */}
        <h3 className="text-lg font-bold text-text mb-4">Use Case Priority Ranking</h3>
        <div className="space-y-3 mb-10">
          {solutionFit.useCaseRanking.map((item) => (
            <div key={item.rank} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <RankBadge rank={item.rank} />
              <div className="flex-1">
                <div className="font-semibold text-text text-sm">{item.category}</div>
                <div className="text-xs text-text-dim mt-0.5">{item.reason}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Realistic volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">2-4</div>
            <div className="text-sm text-text-muted">appointments/week MAX</div>
            <div className="text-xs text-text-dim mt-2">Most weeks: 1-2. The value is in being the NUCLEAR option.</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">∞</div>
            <div className="text-sm text-text-muted">noise if overused</div>
            <div className="text-xs text-text-dim mt-2">10+ things/week = lost specialness = ignored = dead product.</div>
          </div>
        </div>
      </Section>

      {/* ===================== SECTION 3: FEATURE PRIORITIZATION ===================== */}
      <Section
        id="features" number="Section 3"
        title="Feature Prioritization"
        subtitle="Must-have vs. nice-to-have, ranked by actual user value"
        icon={Layers}
      >
        <div className="space-y-3">
          {featurePrioritization.rankings.map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 transition-all hover:border-primary/30">
              <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                <span className="text-2xl font-bold text-text-dim">#{i + 1}</span>
                <TierBadge tier={item.tier} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-text text-sm mb-1">{item.feature}</div>
                <div className="text-xs text-text-dim leading-relaxed">{item.reason}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-8 glass-card rounded-xl p-6 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-text mb-1">Key Insight</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                The <strong className="text-primary-light">"Time to leave" feature</strong> is the true differentiator. Nobody else does this well. 
                Google Calendar tells you when to leave but doesn't CALL you. This alone could justify the entire subscription.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== SECTION 4: PRICING ===================== */}
      <Section
        id="pricing" number="Section 4"
        title="Pricing Strategy"
        subtitle="Brutally honest pricing feedback from a real user"
        icon={DollarSign}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6 border border-emerald-500/20">
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Max Monthly</div>
            <div className="text-4xl font-bold text-text mb-2">${pricing.maxMonthly.amount}</div>
            <p className="text-xs text-text-muted leading-relaxed">{pricing.maxMonthly.reasoning}</p>
          </div>
          <div className="glass-card rounded-xl p-6 border border-blue-500/20">
            <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">Max One-Time</div>
            <div className="text-4xl font-bold text-text mb-2">${pricing.maxOneTime.amount}</div>
            <p className="text-xs text-text-muted leading-relaxed">{pricing.maxOneTime.reasoning}</p>
          </div>
        </div>

        {/* Pricing preferences */}
        <div className="space-y-4 mb-8">
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-amber-400" />
              <h4 className="font-semibold text-text">Subscription vs. One-Time Preference</h4>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{pricing.preference}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={16} className="text-red-400" />
              <h4 className="font-semibold text-text">Immediate "No" Price</h4>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{pricing.immediateNo}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Check size={16} className="text-emerald-400" />
              <h4 className="font-semibold text-text">Free Tier Strategy</h4>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{pricing.freeTier}</p>
          </div>
        </div>

        {/* Pricing recommendation */}
        <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-amber-500/5 to-transparent border-amber-500/20">
          <h4 className="font-bold text-text mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-amber-400" />
            Pricing Recommendation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-surface/50">
              <div className="text-xs text-text-dim mb-1">Free Tier</div>
              <div className="text-xl font-bold text-text">3 calls/week</div>
              <div className="text-xs text-emerald-400 mt-1">Acquisition</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-xs text-primary-light mb-1">Pro Monthly</div>
              <div className="text-xl font-bold text-text">$4.99/mo</div>
              <div className="text-xs text-amber-400 mt-1">Revenue</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-surface/50">
              <div className="text-xs text-text-dim mb-1">Lifetime</div>
              <div className="text-xl font-bold text-text">$29.99</div>
              <div className="text-xs text-blue-400 mt-1">Cash</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== SECTION 5: COMPETITIVE LANDSCAPE ===================== */}
      <Section
        id="competition" number="Section 5"
        title="Competitive Landscape"
        subtitle="Who else is doing this and what's wrong with it?"
        icon={BarChart3}
      >
        <p className="text-text-muted mb-6 text-sm leading-relaxed">{competitiveLandscape.awareOf}</p>
        
        <div className="space-y-3 mb-10">
          {competitiveLandscape.competitors.map((c, i) => (
            <div key={i} className="glass-card rounded-xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-text-dim" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-text text-sm">{c.name}</div>
                  <div className="text-xs text-red-400/80 mt-1">{c.problem}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Would switch */}
        <div className="glass-card rounded-xl p-6 mb-8 border-l-4 border-l-emerald-500/50">
          <div className="flex items-center gap-3 mb-3">
            <ArrowRight size={20} className="text-emerald-400" />
            <h3 className="font-bold text-text">Would You Switch?</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{competitiveLandscape.wouldSwitch}</p>
        </div>

        {/* Unsubscribe triggers */}
        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <XCircle size={20} className="text-red-400" />
          Would Unsubscribe If...
        </h3>
        <div className="space-y-2">
          {competitiveLandscape.wouldUnsubscribe.map((reason, i) => (
            <div key={i} className="glass-card rounded-lg p-4 flex items-start gap-3">
              <span className="text-red-400 mt-0.5 flex-shrink-0"><X size={14} /></span>
              <p className="text-sm text-text-muted">{reason}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===================== SECTION 6: MARKET SIZING ===================== */}
      <Section
        id="market" number="Section 6"
        title="Market Sizing"
        subtitle="Who desperately needs this and how big is the opportunity?"
        icon={Users}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {marketSizing.targetUsers.map((user, i) => {
            const icons = [Brain, Stethoscope, Home, Briefcase, MapPin, GraduationCap];
            const Icon = icons[i] || Users;
            return (
              <div key={i} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">{user.persona}</div>
                    <div className="text-xs text-primary-light font-medium">{user.size}</div>
                  </div>
                </div>
                <p className="text-xs text-text-dim leading-relaxed">{user.reason}</p>
              </div>
            );
          })}
        </div>

        {/* Would recommend */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare size={20} className="text-primary" />
            <h3 className="font-bold text-text">Would You Recommend This?</h3>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{marketSizing.wouldRecommend}</p>
        </div>
      </Section>

      {/* ===================== SECTION 7: DEALBREAKERS ===================== */}
      <Section
        id="dealbreakers" number="Section 7"
        title="Dealbreakers"
        subtitle="What would make this a non-starter?"
        icon={XCircle}
      >
        <div className="space-y-3 mb-10">
          {dealbreakers.nonStarters.map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3 border-l-4 border-l-red-500/30">
              <span className="text-red-400 mt-0.5 flex-shrink-0"><X size={16} /></span>
              <p className="text-sm text-text-muted">{item}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Privacy */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-amber-400" />
              <h3 className="font-bold text-text">Privacy Concerns</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{dealbreakers.privacyConcerns}</p>
            <div className="mt-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <p className="text-xs text-red-400/80 font-medium">
                ⚠ If a healthcare appointment call leaks that I see a therapist or oncologist, that's devastating. Privacy isn't a feature — it's a requirement.
              </p>
            </div>
          </div>

          {/* Carrier restrictions */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-blue-400" />
              <h3 className="font-bold text-text">Carrier Restrictions</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{dealbreakers.carrierRestrictions}</p>
            <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <p className="text-xs text-blue-400/80 font-medium">
                ⚠ If this app gets my number flagged as spam because it's making automated calls, that's a disaster.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== SECTION 8: GO-TO-MARKET ===================== */}
      <Section
        id="gtm" number="Section 8"
        title="Go-to-Market"
        subtitle="How would this reach users and what channels work?"
        icon={Rocket}
      >
        {/* Discovery channels */}
        <h3 className="text-lg font-bold text-text mb-4">Discovery Channels</h3>
        <div className="space-y-3 mb-10">
          {go_to_market.discoveryChannels.map((channel, i) => {
            const icons = [MessageSquare, Send, ExternalLink, Stethoscope, Sparkles];
            const Icon = icons[i] || Rocket;
            const colors = ['text-blue-400', 'text-pink-400', 'text-emerald-400', 'text-amber-400', 'text-purple-400'];
            return (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-lighter flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className={colors[i]} />
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">{channel.channel}</div>
                    <p className="text-xs text-text-dim mt-1 leading-relaxed">{channel.reason}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* B2B Premium */}
        <div className="glass-card rounded-xl p-6 mb-8 bg-gradient-to-r from-emerald-500/5 to-transparent border-emerald-500/20">
          <div className="flex items-start gap-3">
            <Building2 size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-text mb-2">B2B Premium Potential</h4>
              <p className="text-sm text-text-muted leading-relaxed">{go_to_market.b2bPremium}</p>
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-emerald-400 font-medium">
                  💡 A single no-show costs a medical practice $150-200. If this reduces no-shows by 20%, that's massive ROI. B2B healthcare is the real money play.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Unasked question */}
        <div className="glass-card rounded-xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <Eye size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-text mb-2">Question You Haven't Asked</h4>
              <div className="mb-3 p-3 rounded-lg bg-primary/5">
                <p className="text-sm font-medium text-primary-light">{go_to_market.unaskedQuestion.q}</p>
              </div>
              <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">{go_to_market.unaskedQuestion.a}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== VERDICT ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface to-primary/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary-light font-medium mb-4">
              <Sparkles size={14} />
              Final Verdict
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-text mb-4">Overall Assessment</h2>
          </div>

          <div className="glass-card rounded-2xl p-8 mb-8 animate-pulse-glow">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{overallVerdict.rating}</span>
                </div>
                <div className="absolute -inset-1 border border-primary/30 rounded-2xl animate-ring-pulse" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-text">{overallVerdict.ratingLabel}</h3>
                <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <div key={n} className={`w-3 h-3 rounded-sm ${n <= Math.round(overallVerdict.rating) ? 'bg-primary' : 'bg-surface-lighter'}`} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-text-muted leading-relaxed text-sm whitespace-pre-line">{overallVerdict.summary}</p>
          </div>

          {/* Next steps */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-bold text-text mb-4 flex items-center gap-2">
              <Rocket size={18} className="text-primary" />
              Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {overallVerdict.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk indicator */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle size={16} className="text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">Risk Level: Medium</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 9: FREE DOMAIN & DEPLOYMENT GUIDE ===================== */}
      <Section
        id="domain"
        number="Bonus Section"
        title="Launch & Free Domain Setup"
        icon={Globe}
        subtitle="Step-by-step instructions and DNS configuration to deploy your MVP absolutely free."
      >
        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/5 via-surface to-primary/5 border border-primary/20">
            <h3 className="font-bold text-text text-xl mb-4 flex items-center gap-2">
              <Globe className="text-primary" size={24} />
              Top 3 Methods to Get a Free Domain
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              When validating a new product like Allertific, keeping upfront costs at $0 is critical. Here are the most reliable ways to host and brand your application instantly at no cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vercel/Netlify Subdomain */}
              <div className="bg-surface-lighter/30 rounded-xl p-5 border border-surface-lighter flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">1</span>
                    <h4 className="font-bold text-text">Free Hosting Subdomains</h4>
                  </div>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed">
                    Instantly deploy your app to high-performance CDNs. Get a fully secure HTTPS subdomain out of the box with zero configuration.
                  </p>
                  <ul className="space-y-2 text-xs text-text-dim mb-6">
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Vercel (.vercel.app)</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> Netlify (.netlify.app)</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400" /> GitHub Pages (.github.io)</li>
                  </ul>
                </div>
                <div className="bg-surface/50 border border-surface-lighter rounded-lg px-3 py-2 text-[11px] font-mono text-emerald-400 break-all text-center">
                  allertific.vercel.app
                </div>
              </div>

              {/* JS.org / EU.org */}
              <div className="bg-surface-lighter/30 rounded-xl p-5 border border-surface-lighter flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</span>
                    <h4 className="font-bold text-text">JS.org / EU.org</h4>
                  </div>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed">
                    Community-run domain services offering free permanent subdomains for developers and open-source or non-profit projects.
                  </p>
                  <ul className="space-y-2 text-xs text-text-dim mb-6">
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-blue-400" /> Free permanent subdomains</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-blue-400" /> Full DNS control (CNAME/A records)</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-blue-400" /> Managed via simple GitHub PRs</li>
                  </ul>
                </div>
                <div className="bg-surface/50 border border-surface-lighter rounded-lg px-3 py-2 text-[11px] font-mono text-blue-400 break-all text-center">
                  allertific.js.org
                </div>
              </div>

              {/* GitHub Student Pack */}
              <div className="bg-surface-lighter/30 rounded-xl p-5 border border-surface-lighter flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">3</span>
                    <h4 className="font-bold text-text">GitHub Student Pack</h4>
                  </div>
                  <p className="text-xs text-text-muted mb-4 leading-relaxed">
                    If you have an active academic/university email address, claim a completely free top-level domain for 1 year through GitHub's partner offers.
                  </p>
                  <ul className="space-y-2 text-xs text-text-dim mb-6">
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-purple-400" /> Free .me from Namecheap</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-purple-400" /> Free .tech / .live domains</li>
                    <li className="flex items-center gap-1.5"><Check size={12} className="text-purple-400" /> Pro features & certificates included</li>
                  </ul>
                </div>
                <div className="bg-surface/50 border border-surface-lighter rounded-lg px-3 py-2 text-[11px] font-mono text-purple-400 break-all text-center">
                  allertific.me
                </div>
              </div>
            </div>
          </div>

          {/* DNS Checklist */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-text mb-4 flex items-center gap-2">
              <Shield size={18} className="text-primary" />
              Standard DNS Setup & Deployment Checklist
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-surface-lighter/20 rounded-xl border border-surface-lighter">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h5 className="font-semibold text-text text-sm mb-1">Create a Vercel or Netlify Account</h5>
                  <p className="text-xs text-text-muted leading-relaxed">Connect your GitHub repository to Vercel/Netlify. The platform will automatically detect Vite and configure the build settings (`npm run build`).</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-lighter/20 rounded-xl border border-surface-lighter">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h5 className="font-semibold text-text text-sm mb-1">Point Your Custom Domain (DNS Configuration)</h5>
                  <p className="text-xs text-text-muted leading-relaxed mb-3">If using a free custom domain (like JS.org or a student .me domain), update your registrar's DNS settings with the following standard records:</p>
                  <div className="bg-surface p-3 rounded-lg border border-surface-lighter font-mono text-[11px] space-y-2 text-text-dim">
                    <div className="flex justify-between border-b border-surface-lighter/50 pb-1">
                      <span>Type: CNAME</span>
                      <span>Name: www</span>
                      <span className="text-primary">Target: cname.vercel-dns.com.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type: A</span>
                      <span>Name: @</span>
                      <span className="text-primary">Target: 76.76.21.21</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface-lighter/20 rounded-xl border border-surface-lighter">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h5 className="font-semibold text-text text-sm mb-1">Enable Automatic HTTPS/SSL</h5>
                  <p className="text-xs text-text-muted leading-relaxed">Once the DNS propagates (usually 5–15 minutes), your hosting provider will automatically issue a Let's Encrypt SSL certificate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-surface-lighter/50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-text-dim text-sm">
            Product Validation Report — Allertific Concept
          </p>
          <p className="text-text-dim text-xs mt-1">
            All feedback represents realistic user perspectives, not marketing copy.
          </p>
        </div>
      </footer>
    </div>
  );
}
