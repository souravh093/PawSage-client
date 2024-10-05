import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { jsPDF } from "jspdf";

interface FormData {
  petType: string;
  age: number;
  weight: number;
}

const calculateNutrition = (age: number, weight: number, petType: string) => {
  if (petType.toLowerCase() === "dog") {
    return {
      calories: weight * 30 + 70,
      protein: weight * 2,
    };
  } else if (petType.toLowerCase() === "cat") {
    return {
      calories: weight * 25 + 60,
      protein: weight * 1.5,
    };
  } else {
    return { calories: 0, protein: 0 };
  }
};

const NutritionCalculator = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0 });

  const onSubmit = (data: FormData) => {
    const result = calculateNutrition(data.age, data.weight, data.petType);
    setNutrition(result);


    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(`Nutrition Report for ${data.petType}`, 10, 10);
    
    doc.setFontSize(12);
    doc.text(`Age: ${data.age} years`, 10, 20);
    doc.text(`Weight: ${data.weight} kg`, 10, 30);
    doc.text(`Estimated Calories: ${result.calories} kcal/day`, 10, 40);
    doc.text(`Protein Needs: ${result.protein} g/day`, 10, 50);


    doc.save(`${data.petType}_nutrition_report.pdf`);
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 max-w-md mx-auto"
      >
        <Input
          {...register("petType")}
          placeholder="Pet Type (dog/cat)"
          label="Pet Type"
          required
        />
        <Input
          {...register("age")}
          type="number"
          placeholder="Age in years"
          label="Pet Age"
          required
        />
        <Input
          {...register("weight")}
          type="number"
          placeholder="Weight in kg"
          label="Pet Weight"
          required
        />
        <Button type="submit" variant="solid">
          Calculate & Download PDF
        </Button>
      </form>
    </div>
  );
};

export default NutritionCalculator;
