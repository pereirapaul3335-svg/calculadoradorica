import { useState, useMemo } from "react";
import { Ruler, Square, ArrowRight, Layers, Package } from "lucide-react";

type SlideType = "oculta" | "telescopica";

const SLIDE_SIZES = [25, 30, 35, 40, 45, 50, 55, 60];

interface DrawerMeasurements {
  frontBack: { width: number; height: number; quantity: number };
  side: { width: number; height: number; quantity: number };
}

const DrawerCalculator = () => {
  const [vaoLargura, setVaoLargura] = useState<string>("");
  const [vaoAltura, setVaoAltura] = useState<string>("");
  const [profundidade, setProfundidade] = useState<string>("");
  const [tamanhoCorre, setTamanhoCorre] = useState<number>(35);
  const [slideType, setSlideType] = useState<SlideType>("oculta");
  const [comRebaixo, setComRebaixo] = useState<boolean>(false);
  const [comPuxadorCanoa, setComPuxadorCanoa] = useState<boolean>(false);
  const [quantidadeGavetas, setQuantidadeGavetas] = useState<number>(1);

  const measurements = useMemo<DrawerMeasurements | null>(() => {
    const largura = parseFloat(vaoLargura);
    const alturaTotal = parseFloat(vaoAltura);

    if (isNaN(largura) || isNaN(alturaTotal) || quantidadeGavetas < 1) {
      return null;
    }

    // Desconto da largura baseado no tipo de corrediça e rebaixo
    // Oculta com rebaixo: 2.1cm, Oculta normal: 4cm, Telescópica: 5.7cm
    const desconto = slideType === "oculta"
      ? (comRebaixo ? 2.1 : 4)
      : 5.7;

    // Para N gavetas, são (N + 1) espaços de 3cm cada
    // Ex: 3 gavetas = 4 espaços = 12cm
    const totalEspacos = (quantidadeGavetas + 1) * 3;
    const alturaLateral = (alturaTotal - totalEspacos) / quantidadeGavetas;

    // Altura da frente/traseira: altura lateral - 2,5cm (+ 2cm se tiver puxador canoa)
    const alturaFrenteTraseira = alturaLateral - 2.5 - (comPuxadorCanoa ? 2 : 0);

    // Largura da frente/traseira: largura do vão - desconto
    const larguraFrenteTraseira = largura - desconto;

    return {
      frontBack: {
        width: Math.max(0, larguraFrenteTraseira),
        height: Math.max(0, alturaFrenteTraseira),
        quantity: quantidadeGavetas * 2, // 2 peças por gaveta (frente + traseira)
      },
      side: {
        width: tamanhoCorre,
        height: Math.max(0, alturaLateral),
        quantity: quantidadeGavetas * 2, // 2 peças por gaveta (2 laterais)
      },
    };
  }, [vaoLargura, vaoAltura, tamanhoCorre, slideType, quantidadeGavetas, comRebaixo, comPuxadorCanoa]);

  const hasResults = measurements !== null;

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-border/50 animate-scale-in">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-primary" />
          Medidas do Vão
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Largura do Vão (cm)
            </label>
            <input
              type="number"
              value={vaoLargura}
              onChange={(e) => setVaoLargura(e.target.value)}
              placeholder="Ex: 50"
              className="input-wood w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Altura do Vão (cm)
            </label>
            <input
              type="number"
              value={vaoAltura}
              onChange={(e) => setVaoAltura(e.target.value)}
              placeholder="Ex: 15"
              className="input-wood w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Profundidade (cm)
            </label>
            <input
              type="number"
              value={profundidade}
              onChange={(e) => setProfundidade(e.target.value)}
              placeholder="Ex: 40"
              className="input-wood w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Quantidade de Gavetas
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantidadeGavetas(Math.max(1, quantidadeGavetas - 1))}
                className="w-10 h-10 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center text-xl font-bold text-foreground">
                {quantidadeGavetas}
              </span>
              <button
                onClick={() => setQuantidadeGavetas(quantidadeGavetas + 1)}
                className="w-10 h-10 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Tamanho da Corrediça */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Tamanho da Corrediça (cm)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {SLIDE_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setTamanhoCorre(size)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                  tamanhoCorre === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Slide Type Selection */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Tipo de Corrediça
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSlideType("oculta");
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                slideType === "oculta"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span className="block text-lg">Oculta</span>
              <span className="block text-xs opacity-70">
                Desconto: {comRebaixo ? "2,1cm" : "4cm"}
              </span>
            </button>
            <button
              onClick={() => {
                setSlideType("telescopica");
                setComRebaixo(false); // Rebaixo só funciona com oculta
              }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                slideType === "telescopica"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span className="block text-lg">Telescópica</span>
              <span className="block text-xs opacity-70">Desconto: 5,7cm</span>
            </button>
          </div>

          {/* Opção de Rebaixo - apenas para corrediça oculta */}
          {slideType === "oculta" && (
            <div className="mt-4">
              <button
                onClick={() => setComRebaixo(!comRebaixo)}
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 font-medium flex items-center justify-between ${
                  comRebaixo
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-muted-foreground hover:border-accent/50"
                }`}
              >
                <span>Gaveta com Rebaixo</span>
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                  comRebaixo ? "border-accent bg-accent" : "border-border"
                }`}>
                  {comRebaixo && (
                    <svg className="w-3 h-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          )}

          {/* Opção de Puxador Canoa */}
          <div className="mt-4">
            <button
              onClick={() => setComPuxadorCanoa(!comPuxadorCanoa)}
              className={`w-full p-3 rounded-xl border-2 transition-all duration-200 font-medium flex items-center justify-between ${
                comPuxadorCanoa
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50"
              }`}
            >
              <span>Puxador Canoa (-2cm altura)</span>
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                comPuxadorCanoa ? "border-accent bg-accent" : "border-border"
              }`}>
                {comPuxadorCanoa && (
                  <svg className="w-3 h-3 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {hasResults && (
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-border/50 animate-scale-in">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Medidas de Corte
          </h2>

          <div className="space-y-4">
            {/* Frente e Traseira */}
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Square className="w-4 h-4 text-primary" />
                  Frente e Traseira
                </h3>
                <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded-lg font-medium">
                  {measurements.frontBack.quantity} peças
                </span>
              </div>
              <div className="flex items-center gap-3 text-lg font-bold text-foreground">
                <span>{measurements.frontBack.width.toFixed(1)} cm</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span>{measurements.frontBack.height.toFixed(1)} cm</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Largura × Altura
              </p>
            </div>

            {/* Laterais */}
            <div className="bg-accent/5 rounded-2xl p-4 border border-accent/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Square className="w-4 h-4 text-accent" />
                  Laterais
                </h3>
                <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded-lg font-medium">
                  {measurements.side.quantity} peças
                </span>
              </div>
              <div className="flex items-center gap-3 text-lg font-bold text-foreground">
                <span>{measurements.side.width.toFixed(1)} cm</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <span>{measurements.side.height.toFixed(1)} cm</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Profundidade × Altura
              </p>
            </div>

            {/* Summary */}
            <div className="bg-secondary/50 rounded-2xl p-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Resumo:</strong> {quantidadeGavetas} gaveta{quantidadeGavetas > 1 ? 's' : ''} com corrediça {slideType} de {tamanhoCorre}cm
                {comRebaixo && " (com rebaixo)"}
                {comPuxadorCanoa && " (com puxador canoa)"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerCalculator;
