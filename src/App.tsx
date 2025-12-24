import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import CutenessPage from "./pages/CutenessPage";
import JustForYouPage from "./pages/JustForYouPage";
import LittleNotePage from "./pages/LittleNotePage";
import LetterPage from "./pages/LetterPage";
import GiftPage from "./pages/GiftPage";
import MapPage from "./pages/MapPage";
import SurprisePage from "./pages/SurprisePage";
import GalleryPage from "./pages/GalleryPage";
import FinalPage from "./pages/FinalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/cuteness" element={<CutenessPage />} />
          <Route path="/just-for-you" element={<JustForYouPage />} />
          <Route path="/little-note" element={<LittleNotePage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/gift" element={<GiftPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/surprise" element={<SurprisePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
