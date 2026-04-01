import {
  useEffect,
  useState,
  lazy,
  Suspense,
  useMemo,
  memo,
} from "react"
import { getAdminDashboard } from "../../services/dashboardService"
import { StatCard } from "./StatCard"
import html2canvas from "html2canvas"

// COMPONENTS
import SectionCard from "./SectionCard"

const TopCourses = lazy(() => import("./TopCourses"))
const TopSalesman = lazy(() => import("./TopSalesman"))
const SalesBarChart = lazy(() => import("./SalesBarChart"))

export default memo(function DashboardContent() {

  const [data, setData] = useState({})
  const [graph, setGraph] = useState([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState("30d")
  const [showHeavy, setShowHeavy] = useState(false)

  // ✅ MEMO FIX (prevent re-render)
  const filteredGraph = useMemo(() => graph, [graph])

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

  useEffect(() => {

  const CACHE_KEY = `dashboard_${range}`
  const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes

  // ✅ 1. LOAD FROM CACHE (INSTANT UI)
  try {
    const cachedRaw = localStorage.getItem(CACHE_KEY)

    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw)

      if (cached?.data && Date.now() - cached.timestamp < CACHE_EXPIRY) {
        console.log("⚡ Using cached data")

        setData(cached.data)

        setGraph([
          {
            label: "Last 7 Days",
            revenue: cached.data?.revenue7Days || 0,
            sales: cached.data?.sales7Days || 0,
          },
          {
            label: "Last 30 Days",
            revenue: cached.data?.revenue30Days || 0,
            sales: cached.data?.sales30Days || 0,
          },
          {
            label: "Last 1 Year",
            revenue: cached.data?.revenue1Year || 0,
            sales: cached.data?.sales1Year || 0,
          },
        ])

        setLoading(false)
      }
    }
  } catch (e) {
    console.warn("Cache parse error", e)
  }

  // ✅ 2. FETCH NEW DATA (BACKGROUND)
  const fetchDashboard = async () => {
    try {
      const dashboardRes = await getAdminDashboard(range)
      const newData = dashboardRes || {}

      const cachedRaw = localStorage.getItem(CACHE_KEY)
      const cached = cachedRaw ? JSON.parse(cachedRaw) : null

      // ✅ 3. COMPARE DATA
      const isSame =
        cached && JSON.stringify(cached.data) === JSON.stringify(newData)

      if (!isSame) {
        console.log("🔄 Data changed → updating UI")

        const runIdle =
          window.requestIdleCallback || ((cb) => setTimeout(cb, 0))

        runIdle(() => {
          setData(newData)

          setGraph([
            {
              label: "Last 7 Days",
              revenue: newData?.revenue7Days || 0,
              sales: newData?.sales7Days || 0,
            },
            {
              label: "Last 30 Days",
              revenue: newData?.revenue30Days || 0,
              sales: newData?.sales30Days || 0,
            },
            {
              label: "Last 1 Year",
              revenue: newData?.revenue1Year || 0,
              sales: newData?.sales1Year || 0,
            },
          ])

          setLoading(false)

          // ✅ 4. UPDATE CACHE WITH TIMESTAMP
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: newData,
              timestamp: Date.now(),
            })
          )
        })

      } else {
        console.log("✅ Data same → no UI update")
      }

    } catch (err) {
      console.error("Dashboard error:", err)
      setLoading(false)
    }
  }

  fetchDashboard()

  // ✅ KEEP YOUR PERFORMANCE DELAY
  const timer = setTimeout(() => setShowHeavy(true), 1200)
  return () => clearTimeout(timer)

}, [range])

  return (
    <>
      {/* 🔥 PRIORITY HEADER (LCP FIX) */}
      <div className="p-4">
        <h1
          className="text-3xl font-bold"
          style={{ contentVisibility: "auto" }}
        >
          Dashboard
        </h1>
        <p className="text-sm">
          Overview of your platform performance
        </p>
      </div>

      {/* 🔥 REST UI */}
      <div className="space-y-8">

        {/* FILTER */}
        <div className="flex flex-wrap gap-3">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="input"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last 1 Year</option>
          </select>

          <button onClick={exportChart} className="btn btn-primary">
            Export
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 lg:grid-cols-2">

          <SectionCard title="Revenue">
            <StatCard title="Total Revenue" value={loading ? "..." : `₹${data?.totalRevenue ?? 0}`} />
            <StatCard title="Monthly Revenue" value={loading ? "..." : `₹${data?.monthlyRevenue ?? 0}`} />
          </SectionCard>

          <SectionCard title="Sales">
            <StatCard title="Total Sales" value={loading ? "..." : data?.totalSales ?? 0} />
            <StatCard title="Monthly Sales" value={loading ? "..." : data?.monthlySales ?? 0} />
          </SectionCard>

          <SectionCard title="Students">
            <StatCard title="Total Students" value={loading ? "..." : data?.totalStudents ?? 0} />
            <StatCard title="New This Month" value={loading ? "..." : data?.newStudentsThisMonth ?? 0} />
          </SectionCard>

          <SectionCard title="Subscriptions">
            <StatCard title="Total" value={loading ? "..." : data?.totalSubscriptions ?? 0} />
            <StatCard title="Active" value={loading ? "..." : data?.activeSubscriptions ?? 0} />
            <StatCard title="Expired" value={loading ? "..." : data?.expiredSubscriptions ?? 0} />
          </SectionCard>

        </div>

        {/* TIME ANALYTICS */}
        <SectionCard title="Time Analytics">
          <StatCard title="Revenue (7d)" value={data?.revenue7Days ?? 0} />
          <StatCard title="Revenue (30d)" value={data?.revenue30Days ?? 0} />
          <StatCard title="Revenue (1y)" value={data?.revenue1Year ?? 0} />
          <StatCard title="Sales (7d)" value={data?.sales7Days ?? 0} />
          <StatCard title="Sales (30d)" value={data?.sales30Days ?? 0} />
          <StatCard title="Sales (1y)" value={data?.sales1Year ?? 0} />
        </SectionCard>

        {/* HEAVY SECTION */}
        {showHeavy && (
          <div className="grid gap-6 lg:grid-cols-3">

            <div id="chart-section" className="lg:col-span-2">
              <Suspense fallback={<div className="h-[300px] bg-gray-200 rounded-xl" />}>
                <SalesBarChart
                  data={
                    filteredGraph.length
                      ? filteredGraph
                      : [{ label: "No Data", revenue: 0, sales: 0 }]
                  }
                />
              </Suspense>
            </div>

            <div className="space-y-6">
              <Suspense fallback={<div>Loading...</div>}>
                <TopCourses courses={data?.topCourses || []} />
                <TopSalesman data={data?.topSalesman || []} />
              </Suspense>
            </div>

          </div>
        )}

      </div>
    </>
  )
})