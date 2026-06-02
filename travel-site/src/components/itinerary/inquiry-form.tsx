"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema } from "@/lib/validations";

type InquiryValues = z.input<typeof inquirySchema>;

export function InquiryForm({
  itineraryId,
}: {
  itineraryId?: string;
}) {
  const [submittedId, setSubmittedId] = useState("");
  const [serverError, setServerError] = useState("");
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      itineraryId,
      name: "",
      email: "",
      phone: "",
      partySize: 2,
      travelDate: "",
      budget: 5000,
      notes: "",
    },
  });

  async function onSubmit(values: InquiryValues) {
    setServerError("");
    setSubmittedId("");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = (await response.json()) as
      | { id: string }
      | { error: string };
    if (!response.ok || !("id" in payload)) {
      setServerError("error" in payload ? payload.error : "提交失败");
      return;
    }
    setSubmittedId(payload.id);
    form.reset({
      itineraryId,
      name: "",
      email: "",
      phone: "",
      partySize: 2,
      travelDate: "",
      budget: 5000,
      notes: "",
    });
  }

  if (submittedId) {
    return (
      <Card className="grid gap-3 p-6">
        <h2 className="text-2xl font-semibold">询单已提交</h2>
        <p className="text-muted-foreground">
          询单编号：<span className="font-mono text-foreground">{submittedId}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          当前演示环境未配置邮件服务时会写入服务端日志，后台仍可看到记录。
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <input type="hidden" {...form.register("itineraryId")} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          <span>姓名</span>
          <Input {...form.register("name")} />
          {form.formState.errors.name ? (
            <span className="text-xs text-secondary">
              {form.formState.errors.name.message}
            </span>
          ) : null}
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span>邮箱</span>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="text-xs text-secondary">
              {form.formState.errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span>电话 / 微信</span>
          <Input {...form.register("phone")} />
          {form.formState.errors.phone ? (
            <span className="text-xs text-secondary">
              {form.formState.errors.phone.message}
            </span>
          ) : null}
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span>人数</span>
          <Input
            type="number"
            min="1"
            max="50"
            {...form.register("partySize")}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span>出行日期</span>
          <Input type="date" {...form.register("travelDate")} />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span>预算</span>
          <Input type="number" min="0" {...form.register("budget")} />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium">
        <span>备注</span>
        <Textarea
          {...form.register("notes")}
          placeholder="同行人年龄、酒店区域、饮食禁忌、想要调整的体验"
        />
      </label>
      {serverError ? <p className="text-sm text-secondary">{serverError}</p> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        提交询单
      </Button>
    </form>
  );
}
