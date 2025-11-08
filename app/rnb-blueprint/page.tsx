"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlueprintData {
  // Identity Section
  title: string;
  theme: string;
  mood: string;
  audience: string;
  references: string;
  
  // Musical Section
  tempo: string;
  key: string;
  timeSignature: string;
  instrumentation: string;
  
  // Structure Section
  structure: string;
  verseGoal: string;
  chorusHook: string;
  bridgeDirection: string;
  
  // Vocals Section
  leadVocalStyle: string;
  harmonyPlan: string;
  falsettoMoments: string;
  adLibs: string;
  
  // Production Section
  vibeReferences: string;
  mixNotes: string;
  dynamics: string;
  
  // Emotion Section
  listenerTakeaway: string;
  emotionalJourney: string;
}

const initialData: BlueprintData = {
  title: "",
  theme: "",
  mood: "",
  audience: "",
  references: "",
  tempo: "",
  key: "",
  timeSignature: "4/4",
  instrumentation: "",
  structure: "",
  verseGoal: "",
  chorusHook: "",
  bridgeDirection: "",
  leadVocalStyle: "",
  harmonyPlan: "",
  falsettoMoments: "",
  adLibs: "",
  vibeReferences: "",
  mixNotes: "",
  dynamics: "",
  listenerTakeaway: "",
  emotionalJourney: ""
};

export default function RnBBlueprintPage() {
  const [data, setData] = useState<BlueprintData>(initialData);
  const [activeSection, setActiveSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    // Load from localStorage
    const saved = localStorage.getItem('rnb-blueprint');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved blueprint');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // Auto-save to localStorage
      localStorage.setItem('rnb-blueprint', JSON.stringify(data));
    }
  }, [data, isClient]);

  // Lead gating state (simple local gate for Print/Download actions)
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadUnlocked, setLeadUnlocked] = useState(false);
  const lead = {
    unlocked: leadUnlocked,
    unlock: () => setLeadUnlocked(true),
  };

  // Catalog picker state
  const [catalog, setCatalog] = useState<any[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const updateField = (field: keyof BlueprintData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const exportBlueprint = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title || 'untitled'}-blueprint.json`;
    link.click();
  };

  const importBlueprint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setData(imported);
        } catch (error) {
          alert('Failed to import blueprint file');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearBlueprint = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setData(initialData);
    }
  };

  const printBlueprint = () => {
    window.print();
  };

  // gated actions (lead capture)
  function gated(action: () => void) {
    if (lead.unlocked) action();
    else setLeadOpen(true);
  }

  async function saveToCloud() {
    try {
      const res = await fetch('/api/blueprints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: data.title, data }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        alert('Save failed: ' + (err?.error || res.statusText));
      } else {
        const json = await res.json();
        alert('Saved to cloud! id: ' + json.id);
      }
    } catch (e: any) {
      alert('Save failed: ' + (e?.message || e));
    }
  }

  async function loadCatalog() {
    try {
      const res = await fetch('/manifest.json');
      if (!res.ok) throw new Error('Manifest fetch failed');
      const json = await res.json();
      const items: any[] = Array.isArray(json) ? json : (json.tracks ?? json);
      setCatalog(items || []);
      setPickerOpen(true);
    } catch (e) {
      alert('Could not load manifest.json');
    }
  }

  function applyFromCatalog(item: any) {
    updateField('title', item.title || data.title);
    if (item.tempo) updateField('tempo', String(item.tempo));
    if (item.genre && Array.isArray(item.genre) && item.genre.length) {
      updateField('mood', item.genre.includes('R&B') ? 'Romantic, soulful' : item.genre.join(', '));
    }
    setPickerOpen(false);
  }

  const sections = [
    { id: 0, title: "Identity", icon: "🎯" },
    { id: 1, title: "Musical", icon: "🎵" },
    { id: 2, title: "Structure", icon: "🏗️" },
    { id: 3, title: "Vocals", icon: "🎤" },
    { id: 4, title: "Production", icon: "🎛️" },
    { id: 5, title: "Emotion", icon: "💭" }
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading Blueprint...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                ← Back to Home
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">R&B Blueprint</h1>
                <p className="text-sm text-zinc-400 mt-1">PulseNexis Song Creation Tool</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearBlueprint}
                className="px-4 py-2 text-sm border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
              >
                Clear
              </button>

              <button
                onClick={async () => {
                  // open catalog picker
                  await loadCatalog();
                }}
                className="px-4 py-2 text-sm border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
              >
                Import from Catalog
              </button>

              <label className="px-4 py-2 text-sm border border-zinc-700 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={importBlueprint}
                  className="hidden"
                />
              </label>

              <button
                onClick={exportBlueprint}
                className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-xl hover:opacity-90 transition"
              >
                Download JSON
              </button>

              <button
                onClick={() => gated(() => printBlueprint())}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Print
              </button>

              <button
                onClick={async () => await saveToCloud()}
                className="px-4 py-2 text-sm bg-zinc-800 text-white rounded-xl border border-zinc-700 hover:bg-zinc-900 transition"
              >
                Save to Cloud
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 print:hidden">
            <nav className="sticky top-8">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 0 && (
                <IdentitySection data={data} updateField={updateField} />
              )}
              {activeSection === 1 && (
                <MusicalSection data={data} updateField={updateField} />
              )}
              {activeSection === 2 && (
                <StructureSection data={data} updateField={updateField} />
              )}
              {activeSection === 3 && (
                <VocalsSection data={data} updateField={updateField} />
              )}
              {activeSection === 4 && (
                <ProductionSection data={data} updateField={updateField} />
              )}
              {activeSection === 5 && (
                <EmotionSection data={data} updateField={updateField} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
      {/* Modals and pickers rendered inside the page so state is available */}
      <LeadModal
        isOpen={leadOpen}
        onClose={() => setLeadOpen(false)}
        onUnlock={() => {
          lead.unlock();
          setLeadOpen(false);
        }}
      />

      <CatalogPicker
        isOpen={pickerOpen}
        catalog={catalog}
        onClose={() => setPickerOpen(false)}
        onApply={(item: any) => applyFromCatalog(item)}
      />
    </div>
  );
}

// Section Components
function IdentitySection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Song Identity" description="Define the core concept and emotional foundation">
      <FormField
        label="Song Title"
        value={data.title}
        onChange={(value) => updateField('title', value)}
        placeholder="e.g., When I Get You Home"
      />
      <FormField
        label="Theme/Concept"
        value={data.theme}
        onChange={(value) => updateField('theme', value)}
        placeholder="e.g., Romantic anticipation, desire, intimate connection"
        type="textarea"
      />
      <FormField
        label="Mood & Emotion"
        value={data.mood}
        onChange={(value) => updateField('mood', value)}
        placeholder="e.g., Sensual, confident, warm, vulnerable"
      />
      <FormField
        label="Target Audience"
        value={data.audience}
        onChange={(value) => updateField('audience', value)}
        placeholder="e.g., Adults 25-40, R&B/Soul listeners, romantic mood"
      />
      <FormField
        label="Reference Artists/Songs"
        value={data.references}
        onChange={(value) => updateField('references', value)}
        placeholder="e.g., D'Angelo, Solange, Frank Ocean - emotional depth and production style"
        type="textarea"
      />
    </Section>
  );
}

function MusicalSection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Musical Foundation" description="Lock in the sonic framework">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Tempo (BPM)"
          value={data.tempo}
          onChange={(value) => updateField('tempo', value)}
          placeholder="e.g., 82"
        />
        <FormField
          label="Key/Scale"
          value={data.key}
          onChange={(value) => updateField('key', value)}
          placeholder="e.g., A♭ Major"
        />
      </div>
      <FormField
        label="Time Signature"
        value={data.timeSignature}
        onChange={(value) => updateField('timeSignature', value)}
        placeholder="e.g., 4/4"
      />
      <FormField
        label="Instrumentation & Sound Palette"
        value={data.instrumentation}
        onChange={(value) => updateField('instrumentation', value)}
        placeholder="e.g., Live bass, vintage keys, soft drums, subtle strings, ambient pads"
        type="textarea"
      />
    </Section>
  );
}

function StructureSection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Song Structure" description="Map out the journey and flow">
      <FormField
        label="Song Structure"
        value={data.structure}
        onChange={(value) => updateField('structure', value)}
        placeholder="e.g., Intro → Verse → Pre-Chorus → Chorus → Verse → Chorus → Bridge → Final Chorus → Outro"
        type="textarea"
      />
      <FormField
        label="Verse Goal & Content"
        value={data.verseGoal}
        onChange={(value) => updateField('verseGoal', value)}
        placeholder="e.g., Set scene, build tension, establish narrative voice"
        type="textarea"
      />
      <FormField
        label="Chorus Hook & Message"
        value={data.chorusHook}
        onChange={(value) => updateField('chorusHook', value)}
        placeholder="e.g., Main emotional payoff, memorable melody, core message"
        type="textarea"
      />
      <FormField
        label="Bridge Direction"
        value={data.bridgeDirection}
        onChange={(value) => updateField('bridgeDirection', value)}
        placeholder="e.g., New perspective, emotional peak, musical contrast"
        type="textarea"
      />
    </Section>
  );
}

function VocalsSection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Vocal Arrangement" description="Plan the vocal layers and harmony">
      <FormField
        label="Lead Vocal Style"
        value={data.leadVocalStyle}
        onChange={(value) => updateField('leadVocalStyle', value)}
        placeholder="e.g., Smooth, controlled power, subtle runs, conversational delivery"
        type="textarea"
      />
      <FormField
        label="Harmony Plan"
        value={data.harmonyPlan}
        onChange={(value) => updateField('harmonyPlan', value)}
        placeholder="e.g., Thirds on chorus, fifths on bridge, unison doubling on hook"
        type="textarea"
      />
      <FormField
        label="Falsetto Moments"
        value={data.falsettoMoments}
        onChange={(value) => updateField('falsettoMoments', value)}
        placeholder="e.g., Pre-chorus lift, bridge emotional peak, outro ethereal fade"
      />
      <FormField
        label="Ad-libs & Vocal Texture"
        value={data.adLibs}
        onChange={(value) => updateField('adLibs', value)}
        placeholder="e.g., 'Yeah', 'Oh baby', whispered backing, vocal percussion"
        type="textarea"
      />
    </Section>
  );
}

function ProductionSection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Production Vision" description="Guide the sonic treatment and mix">
      <FormField
        label="Vibe References"
        value={data.vibeReferences}
        onChange={(value) => updateField('vibeReferences', value)}
        placeholder="e.g., Warm analog saturation, vinyl crackle, intimate room sound"
        type="textarea"
      />
      <FormField
        label="Mix Notes"
        value={data.mixNotes}
        onChange={(value) => updateField('mixNotes', value)}
        placeholder="e.g., Vocals upfront, bass present but controlled, drums punchy but not overpowering"
        type="textarea"
      />
      <FormField
        label="Dynamics & Energy"
        value={data.dynamics}
        onChange={(value) => updateField('dynamics', value)}
        placeholder="e.g., Verses intimate, chorus opens up, bridge strips down, outro builds then fades"
        type="textarea"
      />
    </Section>
  );
}

function EmotionSection({ data, updateField }: { data: BlueprintData; updateField: (field: keyof BlueprintData, value: string) => void }) {
  return (
    <Section title="Emotional Impact" description="Define the listener experience">
      <FormField
        label="Listener Takeaway"
        value={data.listenerTakeaway}
        onChange={(value) => updateField('listenerTakeaway', value)}
        placeholder="e.g., Feeling of romantic longing, sense of intimate connection, nostalgic warmth"
        type="textarea"
      />
      <FormField
        label="Emotional Journey"
        value={data.emotionalJourney}
        onChange={(value) => updateField('emotionalJourney', value)}
        placeholder="e.g., Anticipation → Desire → Vulnerability → Confidence → Resolution"
        type="textarea"
      />
    </Section>
  );
}

// Utility Components
function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950/60 rounded-2xl border border-zinc-800 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
        <p className="text-zinc-400 mt-2">{description}</p>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'input' 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
  type?: 'input' | 'textarea' 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition"
        />
      )}
    </div>
  );
}

// Simple Lead capture modal (local only — replace with your CRM/tracking later)
function LeadModal({ isOpen, onClose, onUnlock }: { isOpen: boolean; onClose: () => void; onUnlock: () => void; }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-bold text-yellow-400">Unlock Downloads</h3>
        <p className="text-sm text-zinc-300 mt-2">Enter your name and email to unlock printing and downloads.</p>
        <div className="mt-4 space-y-3">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-zinc-700">Cancel</button>
          <button
            onClick={() => {
              // In a real app you would send this to your API/CRM and verify
              onUnlock();
            }}
            className="px-4 py-2 rounded-md bg-yellow-400 text-black font-semibold">
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

// Catalog picker overlay
function CatalogPicker({ isOpen, catalog, onClose, onApply }: { isOpen: boolean; catalog: any[]; onClose: () => void; onApply: (item: any) => void; }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-50 w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-yellow-400">Import from Catalog</h3>
          <button onClick={onClose} className="text-sm text-zinc-400">Close</button>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 max-h-96 overflow-auto">
          {catalog && catalog.length ? catalog.map((item, idx) => (
            <div key={idx} className="p-3 border border-zinc-800 rounded-lg bg-zinc-950/30">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-white">{item.title || item.name || `Item ${idx+1}`}</div>
                  <div className="text-sm text-zinc-400">{item.artist || item.genre || ''}</div>
                </div>
                <div className="ml-4">
                  <button onClick={() => onApply(item)} className="px-3 py-1 bg-yellow-400 text-black rounded-md">Apply</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-zinc-400">No items found in manifest.json</div>
          )}
        </div>
      </div>
    </div>
  );
}