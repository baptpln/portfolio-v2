import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/fragments/navbar";
import { Home } from "@/pages/Home";
import { Contact } from "@/pages/Contact";

import { BackgroundPattern } from "@/components/background-pattern";
import { Footer } from "@/components/fragments/footer";
import { LegalMentions } from "@/pages/LegalMentions";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { Test } from "@/pages/Test";
import { ImageGenerator } from "@/pages/ImageGenerator";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isTestPage = location.pathname === "/test";
  const isImagePage = location.pathname === "/image";
  const isHomePage = location.pathname === "/";
  const hideLayout = isTestPage || isImagePage;
  const hideNavbar = hideLayout || isHomePage;

  return (
    <div className="min-h-screen font-sans text-foreground relative z-10 flex flex-col">
      {!hideLayout && <BackgroundPattern />}
      {!hideNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal-mentions" element={<LegalMentions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/test" element={<Test />} />
          <Route path="/image" element={<ImageGenerator />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
