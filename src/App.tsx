import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import Pillars from '@/components/Pillars';
import Impact from '@/components/Impact';
import Process from '@/components/Process';
import Voices from '@/components/Voices';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <ProblemSection />
      <Pillars />
      <Impact />
      <Process />
      <Voices />
      <Partners />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
