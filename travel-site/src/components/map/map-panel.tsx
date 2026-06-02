import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export type MapPoint = {
  label: string;
  address?: string;
  lat?: number;
  lng?: number;
};

export function MapPanel({
  points,
  title = "地点地图",
}: {
  points: MapPoint[];
  title?: string;
}) {
  const point = points.find((item) => item.lat != null && item.lng != null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const staticMap =
    token && point?.lat != null && point.lng != null
      ? `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/pin-s+0f6b6d(${point.lng},${point.lat})/${point.lng},${point.lat},12,0/900x520?access_token=${token}`
      : null;

  return (
    <Card className="overflow-hidden">
      {staticMap ? (
        <img
          src={staticMap}
          alt={`${title}：${point?.label}`}
          className="h-72 w-full object-cover"
        />
      ) : (
        <div className="flex h-72 flex-col justify-center gap-4 bg-muted p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <MapPin className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              当前未配置 Mapbox token，以下为文本地点信息。
            </p>
          </div>
        </div>
      )}
      <div className="grid gap-3 p-5">
        {points.map((item) => (
          <div key={`${item.label}-${item.address}`} className="flex gap-3">
            <MapPin className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-muted-foreground">
                {item.address ?? "地址待确认"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
