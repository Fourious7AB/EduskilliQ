import UserCard from "./UserCard"

export default function UserGrid({ users }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  )
}