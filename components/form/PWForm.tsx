"use client";

import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export interface IFormConfig {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

export interface IPWFormProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const PWForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IPWFormProps) => {
  const formConfig: IFormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PWForm;
