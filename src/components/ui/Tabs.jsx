import { Tab } from '@headlessui/react';
import clsx from 'clsx';

const Tabs = ({ tabs, children, className }) => {
  return (
    <Tab.Group>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-1 left-1 hidden w-6 rounded-l-lg bg-gradient-to-r from-white to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-1 right-1 hidden w-6 rounded-r-lg bg-gradient-to-l from-white to-transparent sm:block" />
        <Tab.List
          className={clsx(
            'flex gap-1 overflow-x-auto rounded-lg bg-gov-gray-100 p-1 text-sm scrollbar-gov',
            'whitespace-nowrap [scrollbar-color:var(--color-gov-blue-300)_transparent]',
            className
          )}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              className={({ selected }) =>
                clsx(
                  'flex-none rounded-md px-4 py-2.5 font-medium leading-5 transition-all',
                  'lg:flex-1',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-focus focus-visible:ring-offset-2',
                  selected
                    ? 'bg-white text-gov-blue-700 shadow'
                    : 'text-gov-gray-700 hover:bg-white/50 hover:text-gov-gray-900'
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="mt-4">
        {children}
      </Tab.Panels>
    </Tab.Group>
  );
};

const TabPanel = ({ children }) => {
  return (
    <Tab.Panel
      className={clsx(
        'rounded-lg bg-white p-6',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gov-focus'
      )}
    >
      {children}
    </Tab.Panel>
  );
};

Tabs.Panel = TabPanel;

export default Tabs;
