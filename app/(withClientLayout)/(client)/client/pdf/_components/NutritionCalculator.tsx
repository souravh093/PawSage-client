"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";


interface FormData {
  petType: string;
  age: number;
  weight: number;
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { margin: 10, padding: 10 },
  heading: { fontSize: 16, marginBottom: 8 },
  text: { fontSize: 12, marginBottom: 4 },
});

const calculateNutrition = (age: number, weight: number, petType: string) => {
  if (petType === "dog") {
    return {
      calories: weight * 30 + 70,
      protein: weight * 2,
    };
  } else if (petType === "cat") {
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
  const [pdfData, setPdfData] = useState<FormData | null>(null);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0 });

  const onSubmit = (data: FormData) => {
    const result = calculateNutrition(data.age, data.weight, data.petType);
    setNutrition(result);
    setPdfData(data);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 max-w-md mx-auto">
        <Input {...register("petType")} placeholder="Pet Type (dog/cat)" label="Pet Type" required />
        <Input {...register("age")} type="number" placeholder="Age in years" label="Pet Age" required />
        <Input {...register("weight")} type="number" placeholder="Weight in kg" label="Pet Weight" required />
        <Button type="submit" variant="solid">Calculate & Generate PDF</Button>
      </form>

      {pdfData && (
        <div className="mt-8">
          <PDFViewer style={{ width: "100%", height: "600px" }}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text style={styles.heading}>Nutrition Report for {pdfData.petType}</Text>
                  <Text style={styles.text}>Age: {pdfData.age} years</Text>
                  <Text style={styles.text}>Weight: {pdfData.weight} kg</Text>
                  <Text style={styles.text}>Estimated Calories: {nutrition.calories} kcal/day</Text>
                  <Text style={styles.text}>Protein Needs: {nutrition.protein} g/day</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;
