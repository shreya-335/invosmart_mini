"use client"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useTheme } from "../context/ThemeContext"

const ReportsChart = ({ data, type = "line", title, height = 300 }) => {
  const { theme } = useTheme()

  const colors = {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
    danger: "#EF4444",
  }

  const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]

  const chartProps = {
    width: "100%",
    height,
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  }

  const axisProps = {
    tick: { fill: theme === "dark" ? "#D1D5DB" : "#374151", fontSize: 12 },
    axisLine: { stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" },
    tickLine: { stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" },
  }

  const gridProps = {
    strokeDasharray: "3 3",
    stroke: theme === "dark" ? "#374151" : "#E5E7EB",
  }

  const tooltipProps = {
    contentStyle: {
      backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
      border: `1px solid ${theme === "dark" ? "#374151" : "#D1D5DB"}`,
      borderRadius: "8px",
      color: theme === "dark" ? "#F9FAFB" : "#111827",
    },
  }

  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart {...chartProps}>
            <CartesianGrid {...gridProps} />
            <XAxis {...axisProps} dataKey="name" />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Area type="monotone" dataKey="value" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} />
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...chartProps}>
            <CartesianGrid {...gridProps} />
            <XAxis {...axisProps} dataKey="name" />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        )

      case "pie":
        return (
          <PieChart width="100%" height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip {...tooltipProps} />
          </PieChart>
        )

      case "multiline":
        return (
          <LineChart {...chartProps}>
            <CartesianGrid {...gridProps} />
            <XAxis {...axisProps} dataKey="name" />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke={colors.danger}
              strokeWidth={2}
              dot={{ fill: colors.danger, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        )

      default: // line
        return (
          <LineChart {...chartProps}>
            <CartesianGrid {...gridProps} />
            <XAxis {...axisProps} dataKey="name" />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div
      className={`backdrop-blur-md rounded-xl border p-6 ${
        theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
      }`}
    >
      {title && (
        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

export default ReportsChart
