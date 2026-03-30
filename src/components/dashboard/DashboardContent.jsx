import { useEffect, useState, useRef } from "react"
import { getAdminDashboard } from "../../services/dashboardService"
import { StatCard } from "./StatCard"
import html2canvas from "html2canvas"

// COMPONENTS
import SectionCard from "./SectionCard"
import GrowthCard from "./GrowthCard"
import TopCourses from "./TopCourses"
import TopSalesman from "./TopSalesman"
import SalesRevenueChart from "./SalesRevenueChart"
import SalesBarChart from "./SalesBarChart"
import DashboardFilters from "./DashboardFilters"

export default function DashboardContent() {

  // ✅ STATES
  const [data, setData] = useState(null)
  const [graph, setGraph] = useState([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState("30d")

  

  const hasFetched = useRef(false)

  // ✅ FILTER GRAPH
  const filteredGraph = graph

  // ✅ EXPORT
  const exportChart = async () => {
    const chart = document.getElementById("chart-section")
    if (!chart) return

    const canvas = await html2canvas(chart)
    const link = document.createElement("a")
    link.download = "dashboard.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  // ✅ FETCH DATA (NO revenue-graph API)
  useEffect(() => {

    if (hasFetched.current && range === "30d") return
    hasFetched.current = true

    const fetchDashboard = async () => {
      setLoading(true)
      try {

        const dashboardRes = await getAdminDashboard(range)
        setData(dashboardRes)

        // 🔥 BUILD GRAPH FROM DIRECTOR DATA
       setGraph([
  {
    label: "Last 7 Days",
    revenue: dashboardRes.revenue7Days || 0,
    sales: dashboardRes.sales7Days || 0,
  },
  {
    label: "Last 30 Days",
    revenue: dashboardRes.revenue30Days || 0,
    sales: dashboardRes.sales30Days || 0,
  },
  {
    label: "Last 1 Year",
    revenue: dashboardRes.revenue1Year || 0,
    sales: dashboardRes.sales1Year || 0,
  },
])

      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()

  }, [range])

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-xl dark:bg-gray-700" />
        ))}
      </div>
    )
  }

 return (
  <div className="space-y-8 ">

    {/* 🔥 HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold  ">
          Dashboard
        </h1>
        <p className="text-sm ">
          Overview of your platform performance
        </p>
      </div>

      {/* 🔥 ACTIONS */}
      <div className="flex flex-wrap gap-3">

        {/* RANGE SELECT */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="input"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="1y">Last 1 Year</option>
        </select>

        {/* EXPORT */}
        <button
          onClick={exportChart}
          className="btn btn-primary"
        >
          Export
        </button>

      </div>
    </div>

    {/* 🔥 GROWTH CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <GrowthCard title="Revenue Growth" value={data?.revenueGrowth} />
      <GrowthCard title="Sales Growth" value={data?.salesGrowth} />
      <GrowthCard title="Renewal Rate" value={data?.renewalRate} />
    </div>

    {/* 🔥 MAIN STATS GRID */}
    <div className="grid gap-6 lg:grid-cols-2">

      <SectionCard title="Revenue">
        <StatCard title="Total Revenue" value={`₹${data?.totalRevenue ?? 0}`} />
        <StatCard title="Monthly Revenue" value={`₹${data?.monthlyRevenue ?? 0}`} />
      </SectionCard>

      <SectionCard title="Sales">
        <StatCard title="Total Sales" value={data?.totalSales ?? 0} />
        <StatCard title="Monthly Sales" value={data?.monthlySales ?? 0} />
      </SectionCard>

      <SectionCard title="Students">
        <StatCard title="Total Students" value={data?.totalStudents ?? 0} />
        <StatCard title="New This Month" value={data?.newStudentsThisMonth ?? 0} />
      </SectionCard>

      <SectionCard title="Subscriptions">
        <StatCard title="Total" value={data?.totalSubscriptions ?? 0} />
        <StatCard title="Active" value={data?.activeSubscriptions ?? 0} />
        <StatCard title="Expired" value={data?.expiredSubscriptions ?? 0} />
      </SectionCard>

    </div>

    {/* 🔥 TIME ANALYTICS */}
    <SectionCard title="Time Analytics">
      <StatCard title="Revenue (7d)" value={data?.revenue7Days ?? 0} />
      <StatCard title="Revenue (30d)" value={data?.revenue30Days ?? 0} />
      <StatCard title="Revenue (1y)" value={data?.revenue1Year ?? 0} />
      <StatCard title="Sales (7d)" value={data?.sales7Days ?? 0} />
      <StatCard title="Sales (30d)" value={data?.sales30Days ?? 0} />
      <StatCard title="Sales (1y)" value={data?.sales1Year ?? 0} />
    </SectionCard>

    {/* 🔥 CHART + LIST GRID */}
    <div className="grid gap-6 lg:grid-cols-3">

      {/* CHART */}
      <div id="chart-section" className="lg:col-span-2">
        <SalesBarChart data={filteredGraph} />
      </div>

      {/* SIDE LISTS */}
      <div className="space-y-6">
        <TopCourses courses={data?.topCourses} />
        <TopSalesman data={data?.topSalesman} />
      </div>

    </div>

  </div>
)
}