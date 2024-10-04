"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

interface FormData {
  petType: string;
  age: number;
  weight: number;
}

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
  const [PDFComponents, setPDFComponents] = useState<any>(null);

  const onSubmit = async (data: FormData) => {
    const result = calculateNutrition(data.age, data.weight, data.petType);
    setNutrition(result);
    setPdfData(data);

    const { PDFViewer, Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');
    setPDFComponents({ PDFViewer, Document, Page, Text, View, StyleSheet });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("petType")} placeholder="Pet Type" />
        <Input {...register("age")} placeholder="Age" type="number" />
        <Input {...register("weight")} placeholder="Weight" type="number" />
        <Button type="submit">Calculate</Button>
      </form>
      {pdfData && PDFComponents && (
        <PDFComponents.PDFViewer>
          <PDFComponents.Document>
            <PDFComponents.Page style={{ padding: 20 }}>
              <PDFComponents.View style={{ margin: 10, padding: 10 }}>
                <PDFComponents.Text style={{ fontSize: 16, marginBottom: 8 }}>Nutrition Report</PDFComponents.Text>
                <PDFComponents.Text style={{ fontSize: 12, marginBottom: 4 }}>Pet Type: {pdfData.petType}</PDFComponents.Text>
                <PDFComponents.Text style={{ fontSize: 12, marginBottom: 4 }}>Age: {pdfData.age}</PDFComponents.Text>
                <PDFComponents.Text style={{ fontSize: 12, marginBottom: 4 }}>Weight: {pdfData.weight}</PDFComponents.Text>
                <PDFComponents.Text style={{ fontSize: 12, marginBottom: 4 }}>Calories: {nutrition.calories}</PDFComponents.Text>
                <PDFComponents.Text style={{ fontSize: 12, marginBottom: 4 }}>Protein: {nutrition.protein}</PDFComponents.Text>
              </PDFComponents.View>
            </PDFComponents.Page>
          </PDFComponents.Document>
        </PDFComponents.PDFViewer>
      )}
    </div>
  );
};

export default NutritionCalculator;