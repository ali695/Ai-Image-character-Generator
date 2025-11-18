
import React, { useState } from 'react';
import { Image, MessageSquare, Mic } from 'lucide-react';
import { ImageGenerator } from './components/ImageGenerator';
import { Chatbot } from './components/Chatbot';

type Tab = 'generator' | 'chatbot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generator':
        return <ImageGenerator />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
        activeTab === tabName
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="relative isolate min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              AI Character Factory
            </h1>
            <p className="mt-2 text-gray-400">Your one-stop shop for AI-powered creation</p>
          </header>

          <nav className="flex justify-center mb-8">
            <div className="flex items-center gap-4 p-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <TabButton tabName="generator" icon={<Image size={18} />} label="Image Generator" />
              <TabButton tabName="chatbot" icon={<MessageSquare size={18} />} label="Chatbot" />
            </div>
          </nav>

          <main>
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
