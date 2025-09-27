/**
 * アプリヘッダー
 */
export default function AppHeader() {
  return (
    <div className="text-primary-foreground px-4 py-2.5 flex items-center justify-between">
      <div className="grid gap-0.5">
        <h1 className="text-xl font-bold">AI Indian</h1>
        <p className="text-muted/50 text-xs">Advanced AI Assistant</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse" />
        <span className="text-xs font-medium">Online</span>
      </div>
    </div>
  );
}
