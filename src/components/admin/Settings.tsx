import { useState, useEffect } from 'react';
import { Save, Globe, CreditCard, BarChart3, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SettingsData {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    currency: string;
  };
  payments: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
  };
  features: {
    analyticsEnabled: boolean;
    chatSupportEnabled: boolean;
    reviewsEnabled: boolean;
    wishlistEnabled: boolean;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    general: {
      siteName: 'THE KRYPT',
      siteDescription: 'Elite gaming electronics and cutting-edge battle gear.',
      contactEmail: 'contact@thekrypt.com',
      currency: 'KSh'
    },
    payments: {
      stripeEnabled: true,
      paypalEnabled: false
    },
    features: {
      analyticsEnabled: true,
      chatSupportEnabled: true,
      reviewsEnabled: true,
      wishlistEnabled: true
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });

  const [activeSection, setActiveSection] = useState('general');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value');

      if (error) throw error;

      if (data && data.length > 0) {
        const settingsObj = data.reduce((acc, item) => {
          acc[item.key as keyof SettingsData] = item.value;
          return acc;
        }, {} as Partial<SettingsData>);

        setSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save each section as a separate row with JSONB value
      for (const [section, sectionData] of Object.entries(settings)) {
        const { error } = await supabase
          .from('settings')
          .upsert({
            key: section,
            value: sectionData,
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' });

        if (error) throw error;
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (section: keyof SettingsData, key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const sections = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'features', label: 'Features', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Share2 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">COMMAND CENTER <span className="text-red-600">SETTINGS</span></h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-none hover:bg-red-700 disabled:opacity-50 font-black uppercase tracking-widest text-xs"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-none text-left transition-colors ${activeSection === section.id
                    ? 'bg-red-600/10 text-red-600 border border-red-600/20'
                    : 'text-zinc-400 hover:bg-zinc-900'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-none p-6 text-white">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">General Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-none focus:ring-2 focus:ring-red-600 focus:border-transparent uppercase font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-none focus:ring-2 focus:ring-red-600 focus:border-transparent font-bold text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-none focus:ring-2 focus:ring-red-600 focus:border-transparent font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => updateSetting('general', 'currency', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-none focus:ring-2 focus:ring-red-600 focus:border-transparent font-bold text-xs"
                  >
                    <option value="KSh">KSh - Kenyan Shilling</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Payment Settings</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-gray-600">Accept credit card payments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payments.stripeEnabled}
                        onChange={(e) => updateSetting('payments', 'stripeEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-gray-600">Accept PayPal payments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payments.paypalEnabled}
                        onChange={(e) => updateSetting('payments', 'paypalEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'features' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Feature Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(settings.features).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateSetting('features', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'social' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Social Media</h2>

                <div className="space-y-4">
                  {Object.entries(settings.social).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {platform} URL
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => updateSetting('social', platform, e.target.value)}
                        placeholder={`https://${platform}.com/yourstore`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}