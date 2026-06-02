import { LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/features/admin/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminLogin({ error }: { error?: boolean }) {
  return (
    <Card className="mx-auto grid w-full max-w-md gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <LockKeyhole className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">后台登录</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          使用 ADMIN_PASSWORD 环境变量。未配置时本地默认密码为 admin123。
        </p>
      </div>
      <form action={loginAdmin} className="grid gap-3">
        <label className="grid gap-1 text-sm font-medium">
          <span>密码</span>
          <Input name="password" type="password" required />
        </label>
        {error ? <p className="text-sm text-secondary">密码不正确。</p> : null}
        <Button type="submit">登录</Button>
      </form>
    </Card>
  );
}
