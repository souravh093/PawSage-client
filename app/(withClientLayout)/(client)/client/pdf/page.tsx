"use client"
import NutritionCalculator from "./_components/NutritionCalculator";


export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Pet Nutrition Calculator</h1>
      <NutritionCalculator />
    </div>
  );
}
