import { useState, useMemo } from "react";
import { Ruler, Square, ArrowRight, Layers, Package } from "lucide-react";
import DownloadButton from "./DownloadButton";

type SlideType = "oculta" | "telescopica";

const SLIDE_SIZES = [25, 30, 35, 40, 45, 50, 55, 60];

interface ShoerackMeasurements {
  frontBack: { width: number; height: number; quantity: number };
  side: { width: number; height: number; quantity: number };
}

const ShoerackCalculator = () => {
  const [vaoLargura, setVaoLargura] = useState<string>("");
  const [vaoAltura, setVaoAltura] = useState<string>("");
  const [profundidade, setProfundidade] = useState<string>("");
  const [tamanhoCorre, setTamanhoCorre] = useState<number>(35);
  const [slideType, setSlideType] = useState<SlideType>("oculta");
  const [quantidadeSapateiras, setQuantidadeSapateiras] = useState<number>(1);
  const [alturaLateralFixa, setAlturaLateralFixa] = useState<string>("6");

  const measurements = useMemo<ShoerackMeasurements | null>(() => {
    const largura = parseFloat(vaoLargura);
    const alturaLateral = parseFloat(alturaLateralFixa);

    if (isNaN(largura) || isNaN(alturaLateral) || quantidadeSapateiras < 1) {
      return null;
    }

    // Desconto da largura baseado no tipo de corrediça
    const desconto = slideType === "oculta" ? 4 : 5.7;

    // Altura da frente/traseira: altura lateral - 2cm
    const alturaFrenteTraseira = alturaLateral - 2;

    // Largura da frente/traseira: largura do vão - desconto
    const larguraFrenteTraseira = largura - desconto;

    return {
      frontBack: {
        width: Math.max(0, larguraFrenteTraseira),
        height: Math.max(0, alturaFrenteTraseira),
        quantity: quantidadeSapateiras * 2,
      },
      side: {
        width: tamanhoCorre,
        height: Math.max(0, alturaLateral),
        quantity: quantidadeSapateiras * 2,
      },
    };
  }, [vaoLargura, alturaLateralFixa, tamanhoCorre, quantidadeSapateiras, slideType]);

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
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Altura da Lateral (cm)
            </label>
            <input
              type="number"
              value={alturaLateralFixa}
              onChange={(e) => setAlturaLateralFixa(e.target.value)}
              placeholder="Ex: 6"
              className="input-wood w-full"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Quantidade de Sapateiras
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantidadeSapateiras(Math.max(1, quantidadeSapateiras - 1))}
              className="w-10 h-10 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
            >
              -
            </button>
            <span className="flex-1 text-center text-xl font-bold text-foreground">
              {quantidadeSapateiras}
            </span>
            <button
              onClick={() => setQuantidadeSapateiras(quantidadeSapateiras + 1)}
              className="w-10 h-10 rounded-lg bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
            >
              +
            </button>
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
              onClick={() => setSlideType("oculta")}
              className={`p-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                slideType === "oculta"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span className="block text-lg">Oculta</span>
              <span className="block text-xs opacity-70">Desconto: 4cm</span>
            </button>
            <button
              onClick={() => setSlideType("telescopica")}
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

            {/* Visual Representation */}
            <div className="bg-secondary/30 rounded-2xl p-4 border border-border/30">
              <p className="text-sm font-medium text-foreground mb-3">Distribuição Visual:</p>
              <div className="flex flex-col gap-1 overflow-x-auto pb-2">
                {/* Sapateiras intercaladas com vãos - começa com sapateira, termina com vão */}
                {Array.from({ length: quantidadeSapateiras }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    {/* Sapateira */}
                    <div className="h-10 bg-primary rounded-sm flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-medium">
                        Sapateira {index + 1} ({measurements.side.height.toFixed(1)}cm)
                      </span>
                    </div>
                    {/* Vão após cada sapateira */}
                    <div className="h-8 bg-accent/40 rounded-sm flex items-center justify-center border-2 border-dashed border-accent">
                      <span className="text-[10px] text-foreground font-medium">Vão</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {quantidadeSapateiras} sapateira{quantidadeSapateiras > 1 ? 's' : ''} de {measurements.side.height.toFixed(1)}cm cada
              </p>
            </div>

            {/* Summary */}
            <div className="bg-secondary/50 rounded-2xl p-4 mt-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Resumo:</strong> {quantidadeSapateiras} sapateira{quantidadeSapateiras > 1 ? 's' : ''} com corrediça {slideType} de {tamanhoCorre}cm
              </p>
            </div>

            <DownloadButton
              filename="sapateira-resultado"
              content={`CALCULADORA DE SAPATEIRA - RESULTADOS
========================================
Data: ${new Date().toLocaleDateString('pt-BR')}

MEDIDAS INFORMADAS:
- Largura do Vão: ${vaoLargura} cm
- Altura do Vão: ${vaoAltura} cm
- Profundidade: ${profundidade} cm
- Quantidade de Sapateiras: ${quantidadeSapateiras}
- Altura da Lateral: ${alturaLateralFixa} cm
- Tamanho Corrediça: ${tamanhoCorre} cm
- Tipo Corrediça: ${slideType}

MEDIDAS DE CORTE:
Frente e Traseira (${measurements.frontBack.quantity} peças):
- Largura: ${measurements.frontBack.width.toFixed(1)} cm
- Altura: ${measurements.frontBack.height.toFixed(1)} cm

Laterais (${measurements.side.quantity} peças):
- Profundidade: ${measurements.side.width.toFixed(1)} cm
- Altura: ${measurements.side.height.toFixed(1)} cm
`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoerackCalculator;
