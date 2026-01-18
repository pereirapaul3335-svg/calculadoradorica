import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

function serializeError(error: Error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    time: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
  };
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log for local debugging
    // eslint-disable-next-line no-console
    console.error("[AppErrorBoundary]", error, info);

    try {
      localStorage.setItem(
        "__doriva_last_error__",
        JSON.stringify({ ...serializeError(error), componentStack: info.componentStack })
      );
    } catch {
      // ignore
    }
  }

  private copyError = async () => {
    const { error } = this.state;
    if (!error) return;

    const payload = JSON.stringify(serializeError(error), null, 2);
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // ignore
    }
  };

  private reload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Algo deu errado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O app encontrou um erro e parou de renderizar. Toque em “Recarregar”. Se continuar acontecendo,
              toque em “Copiar erro” e me envie.
            </p>

            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm font-medium">Detalhes:</p>
              <p className="text-sm text-muted-foreground break-words">{this.state.error.message}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={this.reload} className="w-full sm:w-auto">
                Recarregar
              </Button>
              <Button onClick={this.copyError} variant="secondary" className="w-full sm:w-auto">
                Copiar erro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
