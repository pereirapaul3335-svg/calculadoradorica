import { useState, useMemo } from "react";
import { Ruler, LayoutGrid, ArrowRight, Package, Link2 } from "lucide-react";

interface RipadoMeasurements {
  espacoRipados: number;
  espacoVaos: number;
  quantidadeVaos: number;
  larguraVao: number;
}

const RipadoCalculator = () => {
  const [quantidadeRipados, setQuantidadeRipados] = useState<string>("");
  const [larguraRipado, setLarguraRipado] = useState<string>("");
  const [tamanhoTotal, setTamanhoTotal] = useState<string>("");
  const [emendaAtivada, setEmendaAtivada] = useState<boolean>(false);

  const measurements = useMemo<RipadoMeasurements | null>(() => {
    const quantidade = parseInt(quantidadeRipados);
    const largura = parseFloat(larguraRipado);
    const total = parseFloat(tamanhoTotal);

    if (isNaN(quantidade) || isNaN(largura) || isNaN(total) || quantidade < 2) {
      return null;
    }

    // Com emenda: última ripa fica metade para fora
    // Espaço ocupado pelos ripados (última ripa conta só metade se emenda ativada)
    const espacoRipados = emendaAtivada
      ? (quantidade - 1) * largura + (largura / 2)
      : quantidade * largura;

    // Quantidade de vãos = ripados - 1
    const quantidadeVaos = quantidade - 1;

    // Espaço restante para os vãos
    const espacoVaos = total - espacoRipados;

    // Largura de cada vão
    const larguraVao = espacoVaos / quantidadeVaos;

    return {
      espacoRipados,
      espacoVaos,
      quantidadeVaos,
      larguraVao,
    };
  }, [quantidadeRipados, larguraRipado, tamanhoTotal, emendaAtivada]);

  const hasResults = measurements !== null;
  const hasError = measurements && measurements.larguraVao < 0;

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-border/50 animate-scale-in">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          Dados do Ripado
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Tamanho Total da Peça (cm)
            </label>
            <input
              type="number"
              value={tamanhoTotal}
              onChange={(e) => setTamanhoTotal(e.target.value)}
              placeholder="Ex: 155"
              className="input-wood w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Quantidade de Ripados
              </label>
              <input
                type="number"
                value={quantidadeRipados}
                onChange={(e) => setQuantidadeRipados(e.target.value)}
                placeholder="Ex: 4"
                min="2"
                className="input-wood w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Largura de Cada Ripado (cm)
              </label>
              <input
                type="number"
                value={larguraRipado}
                onChange={(e) => setLarguraRipado(e.target.value)}
                placeholder="Ex: 3"
                step="0.1"
                className="input-wood w-full"
              />
            </div>
          </div>

          {/* Toggle Emenda */}
          <div
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              emendaAtivada
                ? 'bg-primary/10 border-primary/50'
                : 'bg-secondary/30 border-border/30 hover:bg-secondary/50'
            }`}
            onClick={() => setEmendaAtivada(!emendaAtivada)}
          >
            <div className="flex items-center gap-3">
              <Link2 className={`w-5 h-5 ${emendaAtivada ? 'text-primary' : 'text-muted-foreground'}`} />
              <div>
                <p className={`font-medium ${emendaAtivada ? 'text-primary' : 'text-foreground'}`}>
                  Emenda de Ripado
                </p>
                <p className="text-xs text-muted-foreground">
                  Última ripa fica metade para fora para emendar com outra peça
                </p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-all ${
              emendaAtivada ? 'bg-primary' : 'bg-muted'
            }`}>
              <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${
                emendaAtivada ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-secondary/50 rounded-2xl border border-border/30">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Como funciona:</strong> O ripado começa em um lado da peça e termina no outro.
            Os vãos entre os ripados são calculados para ficarem todos iguais.
            {emendaAtivada && (
              <span className="block mt-2 text-primary">
                <strong>Emenda ativada:</strong> A última ripa terá metade da largura para dentro da peça e metade para fora,
                facilitando a continuação em outra peça.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Results */}
      {hasResults && !hasError && (
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-border/50 animate-scale-in">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Resultado do Cálculo
            {emendaAtivada && (
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                Com Emenda
              </span>
            )}
          </h2>

          <div className="space-y-4">
            {/* Largura do Vão - Destaque Principal */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/30">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Largura de Cada Vão
                </p>
                <p className="text-4xl font-bold text-primary">
                  {measurements.larguraVao.toFixed(2)} cm
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {measurements.quantidadeVaos} vãos iguais
                </p>
              </div>
            </div>

            {/* Detalhes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Ripados ocupam</span>
                </div>
                <p className="text-xl font-bold text-foreground">
                  {measurements.espacoRipados.toFixed(1)} cm
                </p>
                {emendaAtivada && (
                  <p className="text-xs text-muted-foreground mt-1">
                    (última ripa: {(parseFloat(larguraRipado) / 2).toFixed(1)}cm dentro)
                  </p>
                )}
              </div>

              <div className="bg-accent/5 rounded-2xl p-4 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Sobra para vãos</span>
                </div>
                <p className="text-xl font-bold text-foreground">
                  {measurements.espacoVaos.toFixed(1)} cm
                </p>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="bg-secondary/30 rounded-2xl p-4 border border-border/30">
              <p className="text-sm font-medium text-muted-foreground mb-3">Distribuição Visual:</p>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {Array.from({ length: parseInt(quantidadeRipados) || 0 }).map((_, index) => {
                  const isLastRipado = index === parseInt(quantidadeRipados) - 1;
                  const ripadoWidth = emendaAtivada && isLastRipado
                    ? parseFloat(larguraRipado) / 2
                    : parseFloat(larguraRipado);

                  return (
                    <div key={index} className="flex items-center">
                      {/* Ripado */}
                      <div
                        className={`h-12 rounded-sm flex items-center justify-center min-w-[24px] ${
                          emendaAtivada && isLastRipado
                            ? 'bg-primary/50 border-2 border-dashed border-primary'
                            : 'bg-primary/80'
                        }`}
                        style={{ width: `${Math.max(emendaAtivada && isLastRipado ? 12 : 24, ripadoWidth * 4)}px` }}
                      >
                        <span className="text-[10px] text-primary-foreground font-medium">
                          {emendaAtivada && isLastRipado ? '½' : 'R'}
                        </span>
                      </div>
                      {/* Vão (não mostrar após o último ripado) */}
                      {index < parseInt(quantidadeRipados) - 1 && (
                        <div
                          className="h-12 bg-accent/30 rounded-sm flex items-center justify-center min-w-[16px] border-2 border-dashed border-accent/50"
                          style={{ width: `${Math.max(16, measurements.larguraVao * 2)}px` }}
                        >
                          <span className="text-[10px] text-accent font-medium">V</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Indicador de continuação quando emenda ativada */}
                {emendaAtivada && (
                  <div className="flex items-center gap-1 ml-1">
                    <div className="h-12 w-4 bg-muted/50 rounded-sm flex items-center justify-center border-2 border-dotted border-muted-foreground/30">
                      <span className="text-[8px] text-muted-foreground">→</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                R = Ripado ({larguraRipado}cm) | V = Vão ({measurements.larguraVao.toFixed(2)}cm)
                {emendaAtivada && <span className="text-primary"> | ½ = Metade da ripa para emenda</span>}
              </p>
            </div>

            {/* Summary */}
            <div className="bg-secondary/50 rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Resumo:</strong> Em uma peça de {tamanhoTotal}cm,
                {" "}{quantidadeRipados} ripados de {larguraRipado}cm cada, com {measurements.quantidadeVaos} vãos
                de {measurements.larguraVao.toFixed(2)}cm entre eles.
                {emendaAtivada && (
                  <span className="block mt-1 text-primary">
                    A última ripa tem {(parseFloat(larguraRipado) / 2).toFixed(1)}cm para dentro e {(parseFloat(larguraRipado) / 2).toFixed(1)}cm para fora, pronta para emenda.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {hasResults && hasError && (
        <div className="bg-destructive/10 rounded-3xl p-6 border border-destructive/30 animate-scale-in">
          <p className="text-destructive font-medium text-center">
            ⚠️ Os ripados excedem o tamanho total da peça. Reduza a quantidade ou a largura dos ripados.
          </p>
        </div>
      )}
    </div>
  );
};

export default RipadoCalculator;
