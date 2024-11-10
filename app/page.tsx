import { HexagonalChart } from "@/components/hexagonal-chart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Hexagonal Chart Demo</h1>
      <div className="w-full max-w-2xl">
        <HexagonalChart />
      </div>
    </main>
  )
}