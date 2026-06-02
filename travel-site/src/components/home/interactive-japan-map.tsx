"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RegionId =
  | "hokkaido"
  | "tohoku"
  | "hokuriku"
  | "kanto"
  | "tokai"
  | "kansai"
  | "chugoku"
  | "shikoku"
  | "kyushu"
  | "okinawa";

type MapRegion = {
  id: RegionId;
  name: string;
  city: string;
  summary: string;
  panelText: string;
  prefectures: string[];
  slug?: string;
  destinationLabel?: string;
  search: string;
  path: string;
  highlightPath: string;
  labelX: number;
  labelY: number;
  tags: string[];
  gallery: string[];
};

type MapPinItem = {
  name: string;
  regionId: RegionId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor?: "start" | "end";
};

const regions: MapRegion[] = [
  {
    id: "hokkaido",
    name: "北海道",
    city: "札幌",
    summary: "雪景、海鲜、温泉和夏季花田，适合自然、自驾和家庭滑雪。",
    panelText:
      "从札幌、小樽到富良野与道东湿原，北海道适合雪季、花田季和温泉自驾。",
    prefectures: ["北海道"],
    slug: "sapporo",
    destinationLabel: "札幌与北海道",
    search: "札幌",
    labelX: 694,
    labelY: 107,
    tags: ["雪景", "花田", "海鲜"],
    gallery: [
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M667 34 C708 12 766 33 797 75 C823 110 799 146 741 153 C687 160 638 132 631 89 C627 63 642 45 667 34 Z M769 31 C795 28 822 43 832 66 C805 62 785 50 769 31 Z",
    highlightPath:
      "M632 34 L704 10 L790 30 L836 82 L816 146 L746 185 L660 158 L594 98 Z",
  },
  {
    id: "tohoku",
    name: "东北",
    city: "仙台",
    summary: "山海温泉、祭典和季节风景密集，适合从东京向北延伸。",
    panelText:
      "令人印象深刻的祭典、粉雪、湖泊和果园，让东北成为慢慢深入日本的路线。",
    prefectures: ["青森", "岩手", "宫城", "秋田", "山形", "福岛"],
    search: "仙台",
    labelX: 653,
    labelY: 252,
    tags: ["温泉", "祭典", "山海"],
    gallery: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M647 148 C692 151 719 188 715 238 C711 292 690 335 647 363 C610 333 599 279 604 226 C608 188 621 160 647 148 Z",
    highlightPath:
      "M621 146 L684 159 L718 216 L713 306 L676 366 L628 366 L596 304 L601 207 Z",
  },
  {
    id: "hokuriku",
    name: "北陆信越",
    city: "金泽",
    summary: "山岳、海岸、古城和工艺城市串联，适合慢节奏铁路旅行。",
    panelText:
      "从新潟、金泽到高山，适合把山岳景观、古城街区和工艺体验串成铁路路线。",
    prefectures: ["新潟", "富山", "石川", "福井", "长野"],
    search: "金泽",
    labelX: 536,
    labelY: 304,
    tags: ["山岳", "工艺", "海岸"],
    gallery: [
      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M503 245 C551 217 614 230 638 276 C656 309 638 345 601 362 C548 386 492 367 474 323 C459 289 473 261 503 245 Z M459 228 C474 219 492 224 496 238 C500 254 484 265 468 258 C454 252 448 236 459 228 Z",
    highlightPath:
      "M450 228 L526 214 L627 247 L654 307 L604 364 L520 382 L438 338 L428 278 Z",
  },
  {
    id: "kanto",
    name: "关东",
    city: "东京",
    summary: "经典入门区域，适合城市美食、设计购物和箱根温泉延伸。",
    panelText:
      "东京、日光和箱根构成第一次访日的高效率组合，城市体验和近郊温泉都容易安排。",
    prefectures: ["东京", "神奈川", "千叶", "埼玉", "栃木", "群马", "茨城"],
    slug: "tokyo",
    destinationLabel: "东京",
    search: "东京",
    labelX: 636,
    labelY: 414,
    tags: ["城市", "购物", "温泉"],
    gallery: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M606 349 C650 337 697 356 705 399 C713 439 675 473 623 466 C586 461 563 433 569 396 C573 373 584 358 606 349 Z",
    highlightPath:
      "M590 356 L646 346 L697 365 L714 407 L693 453 L635 472 L584 446 L568 400 Z",
  },
  {
    id: "tokai",
    name: "东海",
    city: "名古屋",
    summary: "连接东京与关西，适合富士山、伊势和名古屋城市停靠。",
    panelText:
      "东海适合作为东京和关西之间的中段停靠，加入富士山、伊势和名古屋城市体验。",
    prefectures: ["爱知", "静冈", "岐阜", "三重"],
    search: "名古屋",
    labelX: 523,
    labelY: 431,
    tags: ["富士山", "城市", "神宫"],
    gallery: [
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M480 357 C526 339 585 360 598 404 C609 442 573 479 520 475 C473 472 443 447 449 410 C452 386 462 368 480 357 Z",
    highlightPath:
      "M456 370 L544 354 L605 392 L604 452 L548 488 L468 464 L438 415 Z",
  },
  {
    id: "kansai",
    name: "关西",
    city: "大阪 / 京都",
    summary: "寺社、美食、购物和主题乐园集中，适合第一次关西自由行。",
    panelText:
      "京都、大阪、奈良和神户距离紧凑，适合寺社、市场、美食和主题乐园组合。",
    prefectures: ["大阪", "京都", "奈良", "兵库", "滋贺", "和歌山"],
    slug: "osaka",
    destinationLabel: "大阪",
    search: "大阪",
    labelX: 419,
    labelY: 449,
    tags: ["寺社", "美食", "乐园"],
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M372 385 C421 363 481 382 498 421 C516 464 480 502 424 501 C374 500 340 475 345 434 C348 411 358 394 372 385 Z",
    highlightPath:
      "M348 391 L432 371 L504 405 L512 461 L463 505 L380 494 L332 452 Z",
  },
  {
    id: "chugoku",
    name: "中国",
    city: "广岛",
    summary: "濑户内海、岛屿和历史城市，适合从关西继续向西。",
    panelText:
      "日本西部的海岸线、历史城市和岛屿慢行路线，适合把关西行程继续向西延展。",
    prefectures: ["鸟取", "岛根", "冈山", "广岛", "山口"],
    search: "广岛",
    labelX: 306,
    labelY: 436,
    tags: ["濑户内", "岛屿", "历史"],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M240 407 C293 378 363 382 392 421 C363 466 286 482 226 454 C196 440 202 426 240 407 Z",
    highlightPath:
      "M194 400 L327 384 L407 419 L371 466 L271 486 L181 452 Z",
  },
  {
    id: "shikoku",
    name: "四国",
    city: "高松",
    summary: "海岛、庭园和慢节奏小城，适合二刷日本的小众路线。",
    panelText:
      "四国适合小众慢旅行，串联庭园、海岛、骑行和地方料理。",
    prefectures: ["香川", "德岛", "爱媛", "高知"],
    search: "高松",
    labelX: 376,
    labelY: 511,
    tags: ["庭园", "海岛", "骑行"],
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494475673543-6a6a27143fc8?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M305 486 C355 463 425 471 460 506 C427 543 350 551 296 523 C266 508 271 498 305 486 Z",
    highlightPath:
      "M274 483 L374 463 L470 498 L430 544 L322 554 L258 524 Z",
  },
  {
    id: "kyushu",
    name: "九州",
    city: "福冈",
    summary: "福冈、长崎、鹿儿岛和温泉火山路线，适合美食与温泉。",
    panelText:
      "九州适合美食、温泉和火山海岸，把福冈、长崎、熊本和鹿儿岛串成南下路线。",
    prefectures: ["福冈", "佐贺", "长崎", "熊本", "大分", "宫崎", "鹿儿岛"],
    search: "福冈",
    labelX: 194,
    labelY: 552,
    tags: ["温泉", "火山", "美食"],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M165 475 C217 470 261 509 263 560 C264 606 225 632 183 616 C144 602 121 562 132 520 C137 499 148 483 165 475 Z M120 540 C133 532 151 540 154 557 C156 575 139 584 123 575 C111 568 109 550 120 540 Z",
    highlightPath:
      "M126 475 L210 470 L270 512 L270 585 L226 635 L148 618 L105 558 Z",
  },
  {
    id: "okinawa",
    name: "冲绳群岛",
    city: "那霸",
    summary: "海岛、琉球料理、亲子浮潜和轻松自驾。",
    panelText:
      "飞向冲绳，探索副热带阳光、白沙、珊瑚和琉球王国文化。",
    prefectures: ["冲绳"],
    slug: "okinawa",
    destinationLabel: "冲绳与那霸",
    search: "冲绳",
    labelX: 786,
    labelY: 555,
    tags: ["海岛", "浮潜", "自驾"],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    ],
    path: "M762 515 C783 503 806 512 813 535 C821 562 796 581 768 574 C744 568 733 543 744 526 C748 521 754 517 762 515 Z M705 558 C714 554 725 559 727 569 C729 581 718 589 707 584 C697 579 696 565 705 558 Z M842 590 C854 584 868 589 871 603 C875 619 859 630 844 624 C832 619 830 598 842 590 Z",
    highlightPath:
      "M694 512 L888 536 L894 612 L704 594 Z",
  },
];

const pins: MapPinItem[] = [
  { name: "札幌", regionId: "hokkaido", x: 704, y: 82, labelX: 846, labelY: 72 },
  { name: "富良野", regionId: "hokkaido", x: 724, y: 117, labelX: 846, labelY: 126 },
  { name: "青森", regionId: "tohoku", x: 654, y: 180, labelX: 818, labelY: 177 },
  { name: "仙台", regionId: "tohoku", x: 669, y: 270, labelX: 818, labelY: 270 },
  { name: "福岛", regionId: "tohoku", x: 644, y: 314, labelX: 806, labelY: 330 },
  { name: "日光", regionId: "kanto", x: 635, y: 366, labelX: 802, labelY: 382 },
  { name: "东京", regionId: "kanto", x: 651, y: 420, labelX: 820, labelY: 421 },
  { name: "箱根", regionId: "kanto", x: 611, y: 438, labelX: 782, labelY: 488 },
  {
    name: "佐渡",
    regionId: "hokuriku",
    x: 468,
    y: 242,
    labelX: 412,
    labelY: 215,
    anchor: "end",
  },
  {
    name: "高山",
    regionId: "hokuriku",
    x: 520,
    y: 330,
    labelX: 414,
    labelY: 306,
    anchor: "end",
  },
  {
    name: "金泽",
    regionId: "hokuriku",
    x: 494,
    y: 296,
    labelX: 414,
    labelY: 352,
    anchor: "end",
  },
  { name: "名古屋", regionId: "tokai", x: 528, y: 420, labelX: 602, labelY: 516 },
  { name: "伊势", regionId: "tokai", x: 502, y: 452, labelX: 560, labelY: 550 },
  {
    name: "京都",
    regionId: "kansai",
    x: 405,
    y: 420,
    labelX: 306,
    labelY: 390,
    anchor: "end",
  },
  {
    name: "大阪",
    regionId: "kansai",
    x: 385,
    y: 450,
    labelX: 304,
    labelY: 446,
    anchor: "end",
  },
  { name: "奈良", regionId: "kansai", x: 440, y: 470, labelX: 452, labelY: 578 },
  {
    name: "广岛",
    regionId: "chugoku",
    x: 275,
    y: 438,
    labelX: 154,
    labelY: 420,
    anchor: "end",
  },
  {
    name: "福冈",
    regionId: "kyushu",
    x: 190,
    y: 530,
    labelX: 98,
    labelY: 514,
    anchor: "end",
  },
  {
    name: "长崎",
    regionId: "kyushu",
    x: 148,
    y: 560,
    labelX: 72,
    labelY: 616,
    anchor: "end",
  },
  { name: "鹿儿岛", regionId: "kyushu", x: 195, y: 600, labelX: 312, labelY: 620 },
  {
    name: "高松",
    regionId: "shikoku",
    x: 365,
    y: 505,
    labelX: 270,
    labelY: 548,
    anchor: "end",
  },
  { name: "那霸", regionId: "okinawa", x: 778, y: 548, labelX: 882, labelY: 556 },
];

const defaultRegion = regions.find((region) => region.id === "kanto")!;

function activateFromKeyboard(
  event: React.KeyboardEvent<SVGPathElement>,
  activate: () => void,
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activate();
  }
}

export function InteractiveJapanMap() {
  const [activeId, setActiveId] = useState<RegionId>(defaultRegion.id);
  const activeRegion =
    regions.find((region) => region.id === activeId) ?? defaultRegion;

  function activate(regionId: RegionId) {
    setActiveId(regionId);
  }

  return (
    <section className="bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary">按地图选择</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
              点击城市或地区，高亮目的地
            </h2>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link
              href={`/search?destination=${encodeURIComponent(
                activeRegion.search,
              )}`}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              搜索{activeRegion.city}
            </Link>
          </Button>
        </div>

        <div
          className="relative overflow-hidden rounded-lg border border-border bg-[#f4f3ef] shadow-sm"
          data-testid="interactive-japan-map"
        >
          <div className="relative min-h-[900px] p-4 sm:p-6 lg:min-h-[660px]">
            <div className="absolute inset-x-0 bottom-0 top-[390px] lg:inset-0 lg:left-[260px]">
              <svg
                viewBox="0 0 980 650"
                role="img"
                aria-label="日本区域互动地图"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="980" height="650" fill="#f4f3ef" />
                <path
                  d="M0 62 C94 27 176 42 218 107 C260 172 231 242 176 301 C124 356 118 428 156 499 C188 558 165 618 109 650 L0 650 Z"
                  fill="#e6e6e3"
                />
                <path
                  d="M0 361 C52 344 95 359 115 398 C134 436 107 476 55 480 C31 482 11 474 0 463 Z"
                  fill="#e1e1de"
                />
                <path
                  d="M19 628 L143 497 M610 606 L867 326"
                  fill="none"
                  stroke="#d5d5d2"
                  strokeWidth="2"
                />
                <path
                  d="M848 20 H963 V53 H870 M746 22 L870 53"
                  fill="none"
                  stroke="#d3d3d0"
                  strokeWidth="2"
                />

                <g
                  className="pointer-events-none"
                  filter="url(#landShadow)"
                  transform="matrix(0.2698 0.0476 -0.0476 0.2698 230 -80)"
                >
                  <image
                    href="/maps/japan-prefectures-base.svg"
                    x="0"
                    y="0"
                    width="2090"
                    height="2600"
                    opacity="0.98"
                  />
                </g>

                <g
                  data-testid="active-region-highlight"
                  className="pointer-events-none"
                >
                  <path
                    d={activeRegion.highlightPath}
                    fill="#d91f2c"
                    opacity="0.68"
                    className="transition"
                  />
                  <path
                    d={activeRegion.highlightPath}
                    fill="none"
                    stroke="#d91f2c"
                    strokeWidth="2.4"
                    opacity="0.58"
                    className="transition"
                  />
                </g>

                {regions.map((region) => {
                  const isActive = activeId === region.id;
                  return (
                    <text
                      key={`${region.id}-area-label`}
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      className={cn(
                        "pointer-events-none select-none text-[19px] font-semibold",
                        isActive ? "fill-[#d91f2c]" : "fill-[#7c7f78]",
                      )}
                    >
                      {region.name}
                    </text>
                  );
                })}

                {pins.map((pin) => {
                  const isActive = activeId === pin.regionId;
                  const anchor =
                    pin.anchor ?? (pin.labelX > pin.x ? "start" : "end");
                  const lineEndX = pin.labelX + (anchor === "start" ? -12 : 12);

                  return (
                    <g
                      key={pin.name}
                      className="cursor-pointer"
                      onClick={() => activate(pin.regionId)}
                    >
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={18}
                        fill="transparent"
                        pointerEvents="all"
                      />
                      <line
                        x1={pin.x}
                        y1={pin.y}
                        x2={lineEndX}
                        y2={pin.labelY}
                        stroke={isActive ? "#d91f2c" : "#c2c2bf"}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        pointerEvents="none"
                      />
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={isActive ? 7.5 : 5.5}
                        fill={isActive ? "#d91f2c" : "#858581"}
                        pointerEvents="none"
                        className="transition"
                      />
                      <text
                        x={pin.labelX}
                        y={pin.labelY + 8}
                        textAnchor={anchor}
                        className={cn(
                          "pointer-events-none select-none text-[24px] font-semibold transition-colors",
                          isActive ? "fill-[#d91f2c]" : "fill-[#898986]",
                        )}
                      >
                        {pin.name}
                      </text>
                    </g>
                  );
                })}

                <g filter="url(#landShadow)">
                  {regions.map((region) => {
                    return (
                      <path
                        key={region.id}
                        d={region.path}
                        role="button"
                        tabIndex={0}
                        aria-label={`选择${region.name}`}
                        pointerEvents="all"
                        className={cn(
                          "cursor-pointer transition-colors duration-200 outline-none",
                          "fill-transparent stroke-transparent hover:fill-[#efb5bb] hover:opacity-35",
                        )}
                        onClick={() => activate(region.id)}
                        onKeyDown={(event) =>
                          activateFromKeyboard(event, () => activate(region.id))
                        }
                      />
                    );
                  })}
                </g>

                <defs>
                  <filter
                    id="landShadow"
                    x="-8%"
                    y="-8%"
                    width="116%"
                    height="116%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="1.6"
                      floodColor="#000000"
                      floodOpacity="0.08"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            <Card
              className="relative z-10 max-w-[410px] overflow-hidden border-0 bg-[#242424] text-white shadow-xl"
              data-testid="region-panel"
              aria-live="polite"
            >
              <div className="relative grid aspect-[4/3] grid-cols-2 overflow-hidden">
              {activeRegion.gallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${activeRegion.name}旅行图片${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ))}
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="rounded-md border-2 border-white/90 px-7 py-3 text-3xl font-semibold text-white shadow-sm backdrop-blur-[1px]">
                  {activeRegion.name}
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-6">
              <p
                className="text-lg leading-8 text-white/90"
                data-testid="region-prefectures"
              >
                {activeRegion.prefectures.join(" | ")}
              </p>
              <p className="text-base leading-8 text-white/82">
                {activeRegion.panelText}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeRegion.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="border-white/20 bg-white/10 text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="grid gap-2">
                {activeRegion.slug ? (
                  <Button asChild>
                    <Link href={`/destinations/${activeRegion.slug}`}>
                      查看{activeRegion.destinationLabel}目的地
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline">
                  <Link
                    href={`/search?destination=${encodeURIComponent(
                      activeRegion.search,
                    )}`}
                  >
                    搜索相关体验
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
