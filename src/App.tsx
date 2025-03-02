import { Navbar } from "./components/navbar";
import { RamadhanTracker } from "./components/ramadhan-tracker";
import { ThemeProvider } from "./components/theme-provider";
import "./i18n/i18n"; // Import to initialize i18n
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ramadhan-tracker-theme">
      <div className="pt-20 bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
        <Navbar />
        <main className="container pb-8 px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <RamadhanTracker />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
