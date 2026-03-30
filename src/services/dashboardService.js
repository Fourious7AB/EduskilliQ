import API from "../api/api"

// 🔥 NORMALIZER (VERY IMPORTANT)
const normalizeDashboard = (data) => {
  return {
    // Revenue
    totalRevenue: data?.totalRevenue ?? 0,
    monthlyRevenue: data?.monthlyRevenue ?? 0,
    subscriptionRevenue: data?.subscriptionRevenue ?? 0,
    monthlySubscriptionRevenue: data?.monthlySubscriptionRevenue ?? 0,
    revenueGrowth: data?.revenueGrowth ?? 0,

    // Sales
    totalSales: data?.totalSales ?? 0,
    monthlySales: data?.monthlySales ?? 0,
    salesGrowth: data?.salesGrowth ?? 0,

    // Students
    totalStudents: data?.totalStudents ?? 0,
    newStudentsThisMonth: data?.newStudentsThisMonth ?? 0,
    activeStudents: data?.activeStudents ?? 0,

    // Subscription
    totalSubscriptions: data?.totalSubscriptions ?? 0,
    activeSubscriptions: data?.activeSubscriptions ?? 0,
    expiredSubscriptions: data?.expiredSubscriptions ?? 0,
    renewalRate: data?.renewalRate ?? 0,

    // Time analytics
    revenue7Days: data?.revenue7Days ?? 0,
    revenue30Days: data?.revenue30Days ?? 0,
    revenue1Year: data?.revenue1Year ?? 0,
    sales7Days: data?.sales7Days ?? 0,
    sales30Days: data?.sales30Days ?? 0,
    sales1Year: data?.sales1Year ?? 0,

    // Lists
    topSalesman: data?.topSalesman ?? [],
    topCourses: data?.topCourses ?? [],
  }
}

// 🔥 MAIN API
export const getAdminDashboard = async (range = "30d") => {
  const res = await API.get(`/admin/director?range=${range}`)
  return normalizeDashboard(res.data)
}

// 🔥 GRAPH FIX (IMPORTANT)
export const getRevenueGraph = async (range = "30d") => {
  const res = await API.get(`/admin/revenue-graph?range=${range}`)

  // Ensure graph always has correct format
  return (res.data || []).map((item) => ({
    label: item.label,
    revenue: item.revenue ?? 0,
    sales: item.sales ?? 0,
  }))
}