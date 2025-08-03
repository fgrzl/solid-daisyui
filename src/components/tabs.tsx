import TabsComponent from "./tabs/tabs";
import Tab from "./tabs/tab";

// Create the compound component by adding Tab as a property
const Tabs = TabsComponent as typeof TabsComponent & {
  Tab: typeof Tab;
};

// Export the compound component pattern
Tabs.Tab = Tab;

export default Tabs;
export { Tab };
export type { TabsProps } from "./tabs/tabs";
export type { TabProps } from "./tabs/tab";