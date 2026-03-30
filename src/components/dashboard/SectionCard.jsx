export default function SectionCard({ title, children }) {
  return (
    <div className="
      bg-white card border border-gray-200
      rounded-2xl p-6
      shadow-sm hover:shadow-md transition
    ">
      <h2 className="text-lg font-semibold mb-5 ">
        {title}
      </h2>

      <div className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-2
      ">
        {children}
      </div>
    </div>
  )
}