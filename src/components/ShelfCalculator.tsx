import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const ShelfCalculator = () => {
  const [depth, setDepth] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [openingHeight, setOpeningHeight] = useState<string>("");
  const [mdfThickness, setMdfThickness] = useState<string>("15");
  const [shelfCount, setShelfCount] = useState<string>("");
  const [isThickened, setIsThickened] = useState(false);

  const calculateResults = () => {
    const depthNum = parseFloat(depth) || 0;
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(openingHeight) || 0;
    const thicknessNum = parseFloat(mdfThickness) || 0;
    const countNum = parseInt(shelfCount) || 0;

    if (depthNum <= 0 || widthNum <= 0 || heightNum <= 0 || countNum <= 0) {
      return null;
    }

    // Profundidade final = profundidade - 5mm
    const finalDepth = depthNum - 0.5; // em cm (5mm = 0.5cm)

    // Largura final = largura - 1mm
    const finalWidth = widthNum - 0.1; // em cm (1mm = 0.1cm)

    // Espessura em cm
    const thicknessCm = thicknessNum / 10;

    // Se engrossada, espessura dobra
    const effectiveThickness = isThickened ? thicknessCm * 2 : thicknessCm;

    // Soma total da espessura das prateleiras
    const totalShelfThickness = countNum * effectiveThickness;

    // Altura disponível para vãos
    const availableHeight = heightNum - totalShelfThickness;

    // Quantidade de vãos = prateleiras + 1
    const gapCount = countNum + 1;

    // Altura de cada vão
    const gapHeight = availableHeight / gapCount;

    // Medida do pitão: se engrossada, adiciona a espessura extra
    const pitonMeasure = isThickened ? gapHeight + thicknessCm : gapHeight;

    return {
      finalDepth: finalDepth.toFixed(2),
      finalWidth: finalWidth.toFixed(2),
      totalShelfThickness: totalShelfThickness.toFixed(2),
      availableHeight: availableHeight.toFixed(2),
      gapCount,
      gapHeight: gapHeight.toFixed(2),
      pitonMeasure: pitonMeasure.toFixed(2),
      effectiveThickness: effectiveThickness.toFixed(2),
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-wood-medium/30 bg-gradient-to-br from-wood-light/50 to-white">
        <CardHeader>
          <CardTitle className="text-wood-dark flex items-center gap-2">
            📏 Dados do Móvel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="depth" className="text-wood-dark font-medium">
                Profundidade (cm)
              </Label>
              <Input
                id="depth"
                type="number"
                step="0.1"
                placeholder="Ex: 50"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="input-wood"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width" className="text-wood-dark font-medium">
                Largura (cm)
              </Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                placeholder="Ex: 80"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="input-wood"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openingHeight" className="text-wood-dark font-medium">
                Altura do Vão (cm)
              </Label>
              <Input
                id="openingHeight"
                type="number"
                step="0.1"
                placeholder="Ex: 200"
                value={openingHeight}
                onChange={(e) => setOpeningHeight(e.target.value)}
                className="input-wood"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shelfCount" className="text-wood-dark font-medium">
                Qtd. Prateleiras
              </Label>
              <Input
                id="shelfCount"
                type="number"
                min="1"
                placeholder="Ex: 10"
                value={shelfCount}
                onChange={(e) => setShelfCount(e.target.value)}
                className="input-wood"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-wood-dark font-medium">
              Espessura do MDF
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {["15", "18", "25"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMdfThickness(value)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-200 ${
                    mdfThickness === value
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary/50 text-foreground hover:bg-secondary"
                  }`}
                >
                  {value} mm
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-wood-cream/50 rounded-lg border border-wood-medium/20">
            <Label htmlFor="thickened" className="text-wood-dark font-medium cursor-pointer">
              Prateleira Engrossada
            </Label>
            <Switch
              id="thickened"
              checked={isThickened}
              onCheckedChange={setIsThickened}
            />
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card className="border-wood-accent/30 bg-gradient-to-br from-wood-accent/10 to-wood-cream animate-scale-in">
          <CardHeader>
            <CardTitle className="text-wood-dark flex items-center gap-2">
              📐 Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Profundidade Final:</span>
                <span className="text-wood-accent font-bold text-lg">{results.finalDepth} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Largura Final:</span>
                <span className="text-wood-accent font-bold text-lg">{results.finalWidth} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Espessura por Prateleira:</span>
                <span className="text-wood-accent font-bold text-lg">{results.effectiveThickness} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Soma das Espessuras:</span>
                <span className="text-wood-accent font-bold text-lg">{results.totalShelfThickness} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Altura Disponível (vãos):</span>
                <span className="text-wood-accent font-bold text-lg">{results.availableHeight} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-wood-medium/20">
                <span className="text-wood-dark font-medium">Quantidade de Vãos:</span>
                <span className="text-wood-accent font-bold text-lg">{results.gapCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-wood-accent/20 rounded-lg border border-wood-accent/40">
                <span className="text-wood-dark font-bold">Altura de Cada Vão:</span>
                <span className="text-wood-accent font-bold text-xl">{results.gapHeight} cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-wood-accent/20 rounded-lg border border-wood-accent/40">
                <span className="text-wood-dark font-bold">Medida do Pitão:</span>
                <span className="text-wood-accent font-bold text-xl">{results.pitonMeasure} cm</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShelfCalculator;
