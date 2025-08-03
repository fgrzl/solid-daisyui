import { createSignal } from "solid-js";
import Layout from "../../src/components/layout";
import "./App.css";

// Demo icons
const HomeIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12L5 10L12 3L19 10L21 12M5 12V20C5 20.6 5.4 21 6 21H18C18.6 21 19 20.6 19 20V12"/>
  </svg>
);

const SettingsIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
);

const LogoutIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
  </svg>
);

function App() {
  const [currentPage, setCurrentPage] = createSignal("home");
  const [layoutVariant, setLayoutVariant] = createSignal<"top" | "left" | "right" | "bottom">("left");

  const logout = () => {
    alert("Logout clicked!");
    setCurrentPage("home");
  };

  const renderPageContent = () => {
    switch (currentPage()) {
      case "home":
        return (
          <div>
            <h2 class="text-2xl font-bold mb-4">Welcome Home!</h2>
            <p class="mb-4">This is the home page content. The Layout component provides a responsive navigation system with multiple variants.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                  <h3 class="card-title">Feature 1</h3>
                  <p>Responsive design that adapts to different screen sizes.</p>
                </div>
              </div>
              <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                  <h3 class="card-title">Feature 2</h3>
                  <p>Router-aware navigation using smart Link component.</p>
                </div>
              </div>
              <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                  <h3 class="card-title">Feature 3</h3>
                  <p>Full accessibility support with WCAG 2.1 AA compliance.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 class="text-2xl font-bold mb-4">Settings</h2>
            <p class="mb-4">Configure your application settings here.</p>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Layout Variant</span>
              </label>
              <select 
                class="select select-bordered w-full max-w-xs"
                value={layoutVariant()}
                onChange={(e) => setLayoutVariant(e.target.value as any)}
              >
                <option value="left">Left Navigation</option>
                <option value="right">Right Navigation</option>
                <option value="top">Top Navigation</option>
                <option value="bottom">Bottom Navigation</option>
              </select>
            </div>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2 class="text-2xl font-bold mb-4">Profile</h2>
            <p class="mb-4">Manage your user profile and preferences.</p>
            <div class="card bg-base-200 shadow-md max-w-md">
              <div class="card-body">
                <div class="avatar">
                  <div class="w-24 rounded-full">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                  </div>
                </div>
                <h3 class="card-title">John Doe</h3>
                <p>Software Developer</p>
                <p>john.doe@example.com</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <Layout variant={layoutVariant()} responsive>
      <Layout.Nav collapsible>
        <Layout.NavHeader>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-primary-content font-bold">SD</span>
            </div>
            <span class="text-lg font-bold">Solid DaisyUI</span>
          </div>
          <Layout.ToggleButton />
        </Layout.NavHeader>

        <Layout.NavItem 
          icon={<HomeIcon />} 
          onClick={() => setCurrentPage("home")}
          active={currentPage() === "home"}
        >
          Home
        </Layout.NavItem>
        
        <Layout.NavItem 
          icon={<SettingsIcon />} 
          onClick={() => setCurrentPage("settings")}
          active={currentPage() === "settings"}
        >
          Settings
        </Layout.NavItem>
        
        <Layout.NavItem 
          icon={<ProfileIcon />} 
          onClick={() => setCurrentPage("profile")}
          active={currentPage() === "profile"}
        >
          Profile
        </Layout.NavItem>
        
        <Layout.NavItem icon={<LogoutIcon />} onClick={logout}>
          Logout
        </Layout.NavItem>
      </Layout.Nav>

      <Layout.Content>
        <Layout.Header>
          <h1 class="text-xl font-semibold">Layout Component Demo</h1>
          <div class="flex gap-2">
            <div class="badge badge-outline">Current: {layoutVariant()}</div>
            <div class="badge badge-primary">{currentPage()}</div>
          </div>
        </Layout.Header>

        <Layout.Body>
          {renderPageContent()}
        </Layout.Body>
      </Layout.Content>
    </Layout>
  );
}

export default App;