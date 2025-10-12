export function Loader({ size = 16 }: { size?: number }) {
  return (
    <div
      className="border-foreground ml-3 animate-spin rounded-full border-t-2 border-b-2 ease-linear"
      style={{ width: size, height: size }}
    ></div>
  )
}
