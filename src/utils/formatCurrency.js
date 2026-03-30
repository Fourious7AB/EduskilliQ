export default function formatCurrency(value) {

  if (!value) return "₹0"

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value)

}