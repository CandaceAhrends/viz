import React from 'react';

const SectionTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <button
        key={index}
        className={`w-full bg-${
          activeTab === index ? 'green' : 'slate-200'
        } text-white`}
        onClick={() => setActiveTab(index)}
      >
        {tab.tabTitle}
      </button>
    ));
  };

  return (
    <div className="w-full">
      <div className="flex">{renderTabs()}</div>

      <div className="flex flex-col ">
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{ display: activeTab === index ? 'block' : 'none' }}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;
