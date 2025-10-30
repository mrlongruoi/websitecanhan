"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
}

interface SkillsChartProps {
  skills: Skill[];
}

export function SkillsChart({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Group skills by category dynamically
  const groupedSkills = new Map<string, Skill[]>();

  for (const skill of skills) {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  }

  return (
    <div className="">
      {Array.from(groupedSkills.entries()).map(([category, categorySkills]) => {
        if (!categorySkills || categorySkills.length === 0) return null;

        // Format category for display
        const displayLabel = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        // Prepare chart data and config
        const chartData = categorySkills.map((skill) => ({
          name: skill.name || "Unknown",
          proficiency: skill.percentage || 0,
          fill: skill.color || "var(--color-default)",
        }));

        const chartConfig = {
          proficiency: {
            label: "Proficiency",
            color: "hsl(var(--primary))",
          },
          default: {
            color: "hsl(var(--primary))",
          },
        } satisfies ChartConfig;

        // Calculate dynamic height based on number of skills
        const chartHeight = Math.max(140, categorySkills.length * 32);

        return (
          <div
            key={category}
            className=""
          >
            {/* Category Header */}
            <div className="">
              <div className="">
                <h3 className="">{displayLabel}</h3>
                <span className="">
                  {categorySkills.length}
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="">
              <ChartContainer
                id={`skills-chart-${category}`}
                config={chartConfig}
                className=""
                style={{ height: `${chartHeight}px` }}
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: 0,
                    right: 28,
                    top: 5,
                    bottom: 5,
                  }}
                >
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    width={85}
                    className=""
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        nameKey="proficiency"
                        labelFormatter={(value) => value}
                      />
                    }
                  />
                  <Bar dataKey="proficiency" radius={[0, 6, 6, 0]} barSize={18}>
                    <LabelList
                      dataKey="proficiency"
                      position="right"
                      offset={4}
                      className=""
                      formatter={(value: number) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}