import { useState } from "react";
import { Calculator, Footprints, LayoutGrid } from "lucide-react";
import DrawerCalculator from "@/components/DrawerCalculator";
import ShoerackCalculator from "@/components/ShoerackCalculator";
import RipadoCalculator from "@/components/RipadoCalculator";

type CalculatorType = "gaveta" | "sapateira" | "ripado";

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("gaveta");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground text-4xl font-bold">DM</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
            Calculadora Marcenaria
          </h1>
          <p className="text-primary font-medium text-lg">
            Doriva Móveis Sob Medida
          </p>
        </header>

        {/* Calculator Selector */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-2 shadow-2xl border border-border/50 mb-6 animate-scale-in">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveCalculator("gaveta")}
              className={`p-3 md:p-4 rounded-2xl transition-all duration-300 font-semibold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 ${
                activeCalculator === "gaveta"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-[1.02]"
                  : "bg-background/50 text-muted-foreground hover:bg-secondary/50 hover:scale-[1.01]"
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span className="text-sm md:text-base">Gavetas</span>
            </button>
            <button
              onClick={() => setActiveCalculator("sapateira")}
              className={`p-3 md:p-4 rounded-2xl transition-all duration-300 font-semibold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 ${
                activeCalculator === "sapateira"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-[1.02]"
                  : "bg-background/50 text-muted-foreground hover:bg-secondary/50 hover:scale-[1.01]"
              }`}
            >
              <Footprints className="w-5 h-5" />
              <span className="text-sm md:text-base">Sapateiras</span>
            </button>
            <button
              onClick={() => setActiveCalculator("ripado")}
              className={`p-3 md:p-4 rounded-2xl transition-all duration-300 font-semibold flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 ${
                activeCalculator === "ripado"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-[1.02]"
                  : "bg-background/50 text-muted-foreground hover:bg-secondary/50 hover:scale-[1.01]"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span className="text-sm md:text-base">Ripados</span>
            </button>
          </div>
        </div>

        {/* Active Calculator */}
        {activeCalculator === "gaveta" && <DrawerCalculator />}
        {activeCalculator === "sapateira" && <ShoerackCalculator />}
        {activeCalculator === "ripado" && <RipadoCalculator />}

        {/* Footer */}
        <footer className="text-center mt-10 text-sm text-muted-foreground/70">
          <p>© Doriva Móveis Sob Medida</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
